import React from 'react'
import "./participants.scss"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateStep, resetSteps, allStepsCompleted, updateRender, updateSelectedReview } from '../../redux/slices/reviewsNavbarSlice';

export default function Participants() {
  const dispatch = useDispatch();
  const selectedReview = useSelector(state => state.step.selectedReview);

  const [selectedEmployee, setSelectedEmployee] = useState("")

  const handleSelectChange = (e) => {
    setSelectedEmployee(e.target.value)
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

    <div>deneme</div>

    )

  )
}
