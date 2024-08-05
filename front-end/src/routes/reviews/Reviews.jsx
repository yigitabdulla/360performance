import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar';
import { DataGrid } from '@mui/x-data-grid';
import { reviewData } from "../../lib/reviews";
import ReviewFilter from '../../components/customReviewFilter/ReviewFilter';
import CustomToolbar from '../../components/customReviewToolbar/CustomToolbar';
import ReviewsNavbar from '../../components/reviewsNavbar/ReviewsNavbar';
import { fetchReviews } from '../../redux/slices/reviewsSlice';
import Start from '../../components/start/Start';
import Source from '../../components/source/Source';
import Participants from '../../components/participants/Participants';
import Competencies from '../../components/competencies/Competencies';
import AddReviewStepper from "../../components/addReviewStepper/AddReviewStepper";
import "./reviews.scss";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Reviews() {
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchReviews(token));
    }
  }, [dispatch, token]);

  const data = useSelector(state => state.reviews.data);

  const isLoading = useSelector(state => state.reviews.isLoading);
  const error = useSelector(state => state.reviews.error);

  const activeStep = useSelector(state => state.step.activeStep);
  const render = useSelector(state => state.step.render);

  const [selectionModel, setSelectionModel] = useState([]);

  const columns = [
    {
      field: 'ilerleme',
      headerName: 'Durum',
      width: 150,
      renderCell: (params) => `%${params.value}`,
    },
    { field: 'ad', headerName: 'Değerlendirme Adı', width: 250 },
    { field: 'tarih', headerName: 'Başlangıç-Bitiş Tarihi', width: 200 },
    { field: 'durum', headerName: '', width: 150 },
  ];

  const columnsBackend = [
    {
      field: 'id',
      headerName: 'Durum',
      width: 150,
      renderCell: (params) => `%${params.value}`,
    },
    { field: 'evaluationName', headerName: 'Değerlendirme Adı', width: 250 },
    {
      field: 'startDate',
      headerName: 'Başlangıç-Bitiş Tarihi',
      width: 200,
      renderCell: (params) => {
        const { startDate, endDate } = params.row;
        return `${startDate} / ${endDate}`;
      }
    },
    { field: 'termName', headerName: '', width: 150 },
  ];


  const [filteredRows, setFilteredRows] = useState(data);

  useEffect(() => {
    setFilteredRows(data);
  }, [data]);

  const applyFilters = (filters) => {
    const filteredData = data.filter(row => {
      return (
        (filters.id ? row.id?.includes(filters.id.toLowerCase()) : true) &&
        (filters.evaluationName ? row.evaluationName?.toLowerCase().includes(filters.evaluationName.toLowerCase()) : true) &&
        (filters.termName ? row.termName?.toLowerCase().includes(filters.termName.toLowerCase()) : true)
        //(filters.durum ? row.durum.toString() === filters.durum : true)
      );
    });

    setFilteredRows(filteredData);
  };

  const renderComponent = () => {
    switch (activeStep) {
      case 0:
        return <AddReviewStepper />;
      case 1:
        return <Source />;
      case 2:
        return <Participants />;
      case 3:
        return <Competencies />;
      case 4:
        return <Start />;
      default:
        return <Reviews />;
    }
  };

  return (
    <div className='reviews'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="reviewsContainer">
        <div className="reviewNavbar"><ReviewsNavbar /></div>
        {render ? (
          <>
            <div className='title'>
              <h1>Değerlendirmeler</h1>
              <a href='/reviews/add'>Değerlendirme Oluştur</a>
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <ReviewFilter applyFilters={applyFilters} />
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>Değerlendirmeler yükleniyor... </div>
              ) : error ? (
                <div>Değerlendirmeler yüklenemedi: {error}</div>
              ) : (
                <DataGrid
                  className='dataGrid'
                  rows={filteredRows}
                  columns={columnsBackend}
                  checkboxSelection
                  onRowSelectionModelChange={itm => setSelectionModel(itm)}
                  slots={{
                    toolbar: () => selectionModel.length > 0 ? <CustomToolbar selectedRows={selectionModel} /> : null
                  }}
                />

              )}
            </div>
            <div></div>
          </>
        ) : (
          renderComponent()
        )}
      </div>
    </div>
  );
}
