import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import './participants.scss';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ItemType = 'EMPLOYEE';

// Draggable Employee Component
const DraggableEmployee = ({ employee }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { employee },
  });

  return (
    <div ref={ref} className='singleEmployee'>
      <DragHandleOutlinedIcon />
      {employee[0] + " " + employee[1]}
    </div>
  );
};

// Drop Target Component
const DropTarget = ({ onDrop, children }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item.employee),
  });

  return <div ref={ref} className='dropTarget'>{children}</div>;
};

export default function Participants() {
  const dispatch = useDispatch();
  const selectedReview = useSelector(state => state.step.selectedReview);
  const rows = useSelector(state => state.employees.rows);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleDrop = (employee) => {
    if (!participants.some(p => p[3] === employee[3])) { // Prevent duplicate participants
      setParticipants([...participants, employee]);
    }
  };

  const handleDelete = (employeeToRemove) => {
    setParticipants(participants.filter(p => p[3] !== employeeToRemove[3]));
  };

  const [filter, setFilter] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  // Filter rows based on input
  const filteredRows = rows.filter(row => {
    const fullName = (row[0] + " " + row[1]).toLowerCase();
    return fullName.includes(filter);
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("h")
  }

  return (
    (!selectedReview || selectedReview === "all") ? (
      <div className='participants'>
        <div className="left">
          <div className="title">Katılımcılar</div>
          <div className="text">
            <span>360 Değerlendirmenizi Yönetin</span>
            <span>İşlem yapmak istediğiniz değerlendirmenizi seçin veya yeni bir değerlendirme oluşturun. </span>
          </div>
          <div className="buttons">
            <button>Değerlendirme Oluştur</button>
            <a>Değerlendirme Seç</a>
          </div>
        </div>
        <div className="right">
          <img src="/people.svg" alt="" />
        </div>
      </div>
    ) : ((selectedEmployee === "") ? (<div className='participantsForm'>
      <div className="title">Katılımcıları Belirle</div>
      <div className="selectEmployee">
        <h3>Değerlendirilen Çalışan</h3>
        <select style={{ color: '#8d8d8d' }} onChange={handleSelectChange} name="employee">
          <option value="">Değerlendirilecek Çalışanı Seçiniz</option>
          <option value="ahmet">ahmet</option>
          <option value="mehmet">mehmet</option>
        </select>
      </div>
    </div>) :
      <DropTarget onDrop={handleDrop}>
        <div className='selectEmployeeForm'>
          <div className="selectEmployeeFormTitle">
            <h3>Katılımcıları Belirle</h3>
            <a><FileUploadOutlinedIcon />İçe Aktar</a>
            <span>Katılımcıları belirlemek için tüm Çalışanlar kısmından kullanıcıları sürükleyebilirsiniz.</span>
          </div>

          <div className="selectSection">
            <div className="left">
              <label htmlFor="employee">Değerlendirilen Çalışan</label>
              <select
                style={{ color: '#8d8d8d' }}
                onChange={handleSelectChange}
                name="employee"
                value={selectedEmployee}
              >
                <option value="">Değerlendirilecek Çalışanı Seçiniz</option>
                <option value="ahmet">ahmet</option>
                <option value="mehmet">mehmet</option>
              </select>
              <span>Katılımcılar</span>
              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <div className="item">
                    <label htmlFor="manager">Yönetici</label>
                    <input required id="manager" name="manager" type="text" />
                  </div>
                  <div className="item">
                    <label htmlFor="equivalent">Eş Değer</label>
                    <input required id="equivalent" name="equivalent" type="text" />
                  </div>
                  <div className="item">
                    <label htmlFor="subordinate">Ast</label>
                    <input required id="subordinate" name="subordinate" type="text" />
                  </div>
                  <div className="item">
                    <label htmlFor="other">Diğer</label>
                    <input required id="other" name="other" type="text" />
                  </div>
                  <div className="item" id='selfItem'>
                    <label htmlFor="self">Kendi</label>
                    <span>
                      <input required id="self" name="self" type="checkbox" value={selectedEmployee} />
                      <p>{selectedEmployee}</p>
                    </span>
                  </div>
                  <div className="participantsList">
                    {participants.length > 0 ? (
                      participants.map((p, index) => (
                        <div key={index} className='participant'>
                          {p[0] + " " + p[1]}
                            <DeleteOutlineOutlinedIcon style={{alignSelf:'flex-end', cursor:'pointer'}} onClick={() => handleDelete(p)} />
                        </div>
                      ))
                    ) : (
                      <div>Katılımcı seçilmedi</div>
                    )}
                  </div>
                </div>
                <button type='submit' className='saveParticipantButton'>Kaydet</button>
              </form>
              
            </div>

            <div className="right">
              <div className="title">
                <span>Tüm Çalışanlar</span>
                <input onChange={handleInputChange} type="text" placeholder='Çalışan bul' />
              </div>

              <div className="employees">
                {filteredRows.map(row => (
                  <DraggableEmployee employee={row} key={row.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DropTarget>
    )
  );
}
