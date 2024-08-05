import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateStep, resetSteps, allStepsCompleted, updateRender, updateSelectedReview } from '../../redux/slices/reviewsNavbarSlice';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./competencies.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Competencies() {

  const [isUploading, setIsUploading] = useState(false)

  const [openCompetenceModal, setOpenCompetenceModal] = useState(false);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [currentCompetenceIndex, setCurrentCompetenceIndex] = useState(null);

  const handleOpenCompetenceModal = () => setOpenCompetenceModal(true);
  const handleCloseCompetenceModal = () => setOpenCompetenceModal(false);

  const handleOpenQuestionModal = (index) => {
    setCurrentCompetenceIndex(index);
    setOpenQuestionModal(true);
  };
  const handleCloseQuestionModal = () => setOpenQuestionModal(false);

  const dispatch = useDispatch();
  const selectedReview = useSelector(state => state.step.selectedReview);

  const [competencies, setCompetencies] = useState([
    {
      name: 'İletişim',
      sections: { y: true, e: true, a: true, d: true, k: true },
      questions: [
        { name: 'Çalışan iletişimde ne kadar iyi?', y: true, e: true, a: true, d: true, k: true },
        { name: 'İyi bir ekip üyesi mi?', y: true, e: true, a: true, d: true, k: true },
      ],
    },
    {
      name: 'Teknik Beceriler',
      sections: { y: true, e: true, a: true, d: true, k: true },
      questions: [
        { name: 'Çalışan gerekli teknik beceriler konusunda ne kadar yetkin?', y: true, e: true, a: true, d: true, k: true },
        { name: 'Yeni teknolojilere ayak uyduruyor mu?', y: true, e: true, a: true, d: true, k: true },
      ],
    },
  ]);

  const [newCompetence, setNewCompetence] = useState({
    name: '',
    sections: { y: true, e: true, a: true, d: true, k: true },
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({ name: '', y: true, e: true, a: true, d: true, k: true });

  const handleAddCompetence = () => {
    setCompetencies([...competencies, newCompetence]);
    setNewCompetence({ name: '', sections: { y: true, e: true, a: true, d: true, k: true }, questions: [] });
    handleCloseCompetenceModal();
    // Call a notification function if needed
  };

  const handleNewCompetenceChange = (e) => {
    setNewCompetence({ ...newCompetence, name: e.target.value });
  };

  const handleNewQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, name: e.target.value });
  };

  const handleAddQuestion = () => {
    const updatedCompetencies = competencies.map((competence, index) =>
      index === currentCompetenceIndex
        ? {
          ...competence,
          questions: [...competence.questions, newQuestion],
        }
        : competence
    );
    setCompetencies(updatedCompetencies);
    setNewQuestion({ name: '', y: true, e: true, a: true, d: true, k: true });
    handleCloseQuestionModal();
    // Call a notification function if needed
  };

  const handleToggleSection = (competenceIndex, key) => {
    const updatedCompetencies = competencies.map((competence, cIndex) => {
      if (cIndex === competenceIndex) {
        const newSections = { ...competence.sections, [key]: !competence.sections[key] };
        const updatedQuestions = competence.questions.map(question => ({
          ...question,
          [key]: newSections[key],
        }));
        return { ...competence, sections: newSections, questions: updatedQuestions };
      }
      return competence;
    });
    setCompetencies(updatedCompetencies);
  };

  const handleToggleButton = (competenceIndex, questionIndex, key) => {
    const updatedCompetencies = competencies.map((competence, cIndex) => {
      if (cIndex === competenceIndex) {
        const updatedQuestions = competence.questions.map((question, qIndex) => {
          if (qIndex === questionIndex) {
            return { ...question, [key]: !question[key] };
          }
          return question;
        });
        return { ...competence, questions: updatedQuestions };
      }
      return competence;
    });
    setCompetencies(updatedCompetencies);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const [header, ...dataRows] = jsonData;
      const cols = header.map((col, index) => ({ field: index.toString(), headerName: col, width: 150 }));
      const rowData = dataRows.map((row, index) => {
        const rowObj = {};
        row.forEach((cell, cellIndex) => {
          rowObj[cellIndex.toString()] = cell;
        });
        return { id: index, ...rowObj };
      });

      const transformedColumns = cols.map((col) => ({
        ...col,
        headerName: col.headerName.charAt(0).toUpperCase() + col.headerName.slice(1).toLowerCase(),
      }));

      setTempColumns(transformedColumns);
      setTempRows(rowData);

    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    setIsUploading(!isUploading)
  };

  return (
    (!selectedReview || selectedReview === "all") ? (
      <div className='competencies'>
        <div className="left">
          <div className="title">Yetkinlik Nedir?</div>
          <div className="text">
            <span>Çalışanların işletme içindeki yeteneklerine ve davranışlarına bağlı olarak başarısının ölçülmesidir.</span>
            <span>Yetkinlik bazlı performans değerlendirme soruları oluşturabilmek için lütfen değerlendirme seçiniz. </span>
          </div>
          <button>Değerlendirme Seç</button>
        </div>
        <div className="right">
          <img src="/search.svg" alt="" />
        </div>
      </div>
    ) : (
      (!isUploading ? <div className="competenciesForm">
        <div className="top">
          <div className="title">Yetkinlikler</div>
          <div className="buttons">
            <a><InsertDriveFileOutlinedIcon className='button-icon' /> Boş Şablon</a>
            <a onClick={handleUpload}><DescriptionOutlinedIcon className='button-icon' /> Örnek Şablon</a>
            <a><RemoveRedEyeOutlinedIcon className='button-icon' /> Ön İzle</a>
            <a><SettingsOutlinedIcon className='button-icon' /> Ayarlar</a>
          </div>
          <hr />
          <div className="text"><ExploreOutlinedIcon /> Değerlendirme formu oluşturmak için yetkinlik ekle ve soru ekle butonlarını kullanın.</div>
          <button onClick={handleOpenCompetenceModal} className='addCompetencies'>Yetkinlik Ekle</button>

          {competencies.map((competence, index) => (
            <div className='competenceContainer' key={index}>
              <div className="competenceTitle">
                <h2>{competence.name}</h2>
                <div className='sections'>
                  {['y', 'e', 'a', 'd', 'k'].map((key) => (
                    <button
                      key={key}
                      style={{ backgroundColor: competence.sections[key] ? '#0063c6' : 'lightgray', color: competence.sections[key] ? 'white' : 'black' }}
                      onClick={() => handleToggleSection(index, key)}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <ul>
                {competence.questions.map((question, qIndex) => (
                  question.name !== "" && (
                    <li key={qIndex}>
                      {question.name}
                      <div className='questionButtons'>
                        {['y', 'e', 'a', 'd', 'k'].map((key) => (
                          <button
                            key={key}
                            style={{ backgroundColor: question[key] ? '#0063c6' : 'lightgray', color: question[key] ? 'white' : 'black' }}
                            onClick={() => handleToggleButton(index, qIndex, key)}
                          >
                            {key.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </li>
                  )
                ))}
              </ul>
              <button className='addQuestion' onClick={() => handleOpenQuestionModal(index)}>Soru Ekle</button>
            </div>
          ))}
        </div>

        {/* Competence Modal */}
        <Modal
          open={openCompetenceModal}
          onClose={handleCloseCompetenceModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <span onClick={handleCloseCompetenceModal} className='close-button'>X</span>
            <Typography
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid gray', color: 'rgb(75, 75, 75)', marginTop: '-20px', marginBottom: '20px' }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Yetkinlik Ekle
            </Typography>
            <div className="item">
              <label htmlFor="competencies-name">Yetkinlik Adı</label>
              <input
                required
                id="competencies-name"
                name="competencies-name"
                type="text"
                placeholder=""
                value={newCompetence.name}
                onChange={handleNewCompetenceChange}
              />
            </div>
            <div className="item">
              <label htmlFor="competencies-explanation">Açıklama</label>
              <input required id="competencies-explanation" name="competencies-explanation" type="text" />
            </div>
            <div className="editButtons">
              <button onClick={handleCloseCompetenceModal}>İptal</button>
              <button onClick={handleAddCompetence}>Kaydet</button>
            </div>
          </Box>
        </Modal>

        {/* Question Modal */}
        <Modal
          open={openQuestionModal}
          onClose={handleCloseQuestionModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <span onClick={handleCloseQuestionModal} className='close-button'>X</span>
            <Typography
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid gray', color: 'rgb(75, 75, 75)', marginTop: '-20px', marginBottom: '20px' }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Soru Ekle
            </Typography>
            <div className="item">
              <label htmlFor="question-name" style={{ marginBottom: '5px' }}>Soru Adı</label>
              <input
                required
                id="question-name"
                name="question-name"
                type="text"
                placeholder=""
                value={newQuestion.name}
                onChange={handleNewQuestionChange}
              />
            </div>
            <div className="editButtons">
              <button onClick={handleCloseQuestionModal}>İptal</button>
              <button onClick={handleAddQuestion}>Kaydet</button>
            </div>
          </Box>
        </Modal>
      </div>
        :
        <div className="competenciesContainer">
          <div className='competenciesContainerTitle'>
            <h1>Yetkinlikler</h1>
            <div className="templates">
              <div className="buttons">
                <a><InsertDriveFileOutlinedIcon /> Boş Şablon</a>
                <a><DescriptionOutlinedIcon /> Örnek Şablon</a>
                <a><RemoveRedEyeOutlinedIcon /> Ön İzle</a>
                <a><SettingsOutlinedIcon /> Ayarlar</a>
              </div>
            </div>
            <hr />
          </div>

          <div className="info">
            <span><ExploreOutlinedIcon />Örnek şablonu inceleyebilirsiniz, boş şablonu güncelleyerek yükleyebilirsiniz.</span>
            <span><ExploreOutlinedIcon />Dosyanızı seçerek kaydet butonuna tıklayın. Sadece xlsx uzantılı dosya yükleyebilirsiniz. Dosya boyutu en fazla 2MB, satır sayısı en fazla 1500 satır olmalıdır.</span>
          </div>
          <div className="buttons">
            <input id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <button onClick={handleUpload}>Kaydet</button>
          </div>
        </div>)
    )
  );
}
