import React, { useState } from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./reviews.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { reviewData } from "../../lib/reviews"
import ReviewFilter from '../../components/customReviewFilter/ReviewFilter';
import CustomToolbar from '../../components/customReviewToolbar/CustomToolbar';
import ReviewsNavbar from '../../components/reviewsNavbar/ReviewsNavbar';
import { useDispatch, useSelector } from "react-redux"
import { updateStep, completeStep, resetSteps, setSteps, totalSteps, completedSteps, isLastStep, allStepsCompleted , updateRender} from '../../redux/slices/reviewsNavbarSlice';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';


export default function Reviews() {

  const dispatch = useDispatch();
    const activeStep = useSelector(state => state.step.activeStep);
    const completed = useSelector(state => state.step.completed);
    const steps = useSelector(state => state.step.steps);
    const render = useSelector(state => state.step.render);


    const handleNext = () => {
        const newActiveStep =
            isLastStep({ step: { activeStep, steps } }) && !allStepsCompleted({ step: { completed, steps } })
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        dispatch(updateStep(newActiveStep));
        dispatch(updateRender({render:false}))
    };

    const handleComplete = () => {
        dispatch(completeStep(activeStep));
        dispatch(updateRender({render:false}))
        handleNext();
    };

    const handleReset = () => {
        dispatch(resetSteps());
        dispatch(updateRender({render:true}))
    };

  const [selectionModel, setSelectionModel] = useState([]);


  const columns = [
    {
      field: 'ilerleme',
      headerName: 'Durum',
      width: 150,
      renderCell: (params) => `%${params.value}`
    },
    { field: 'ad', headerName: 'Değerlendirme Adı', width: 250 },
    { field: 'tarih', headerName: 'Başlangıç-Bitiş Tarihi', width: 200 },
    { field: 'durum', headerName: '', width: 150 }
  ];
  const rows = reviewData

  const [filteredRows, setFilteredRows] = useState(rows);

  const applyFilters = (filters) => {
    const filteredData = rows.filter(row => {
      return (
        (filters.ilerleme ? row.ilerleme?.toLowerCase().includes(filters.ilerleme.toLowerCase()) : true) &&
        (filters.ad ? row.ad?.toLowerCase().includes(filters.ad.toLowerCase()) : true) &&
        (filters.durum ? row.durum.toString() === filters.durum : true)
      );
    });

    setFilteredRows(filteredData);
  };




  return (
    <div className='reviews'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="reviewsContainer">
        <div className="reviewNavbar"><ReviewsNavbar /></div>
        {render ?<> <div className='title'>
          <h1>Değerlendirmeler</h1>
          <a href='/reviews/add'>Değerlendirme Oluştur</a>
        </div>
        {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Adım {activeStep + 1} tamamlandı
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps({ step: { completed, steps } }) === totalSteps({ step: { steps } }) - 1
                                                    ? 'Bitir'
                                                    : 'Adımı tamamla'}
                                            </Button>
                                        ))}
        <div style={{ height: 400, width: '100%' }}>
          <ReviewFilter applyFilters={applyFilters} />
          <DataGrid
            className='dataGrid'
            rows={filteredRows}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={itm => setSelectionModel(itm)}
            slots={{ toolbar: selectionModel.length > 0 ? CustomToolbar : null }}
          />
        </div></> : <div></div>}

      </div>
    </div>
  )
}
