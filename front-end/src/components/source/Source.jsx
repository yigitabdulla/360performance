import React from 'react'
import "./source.scss"
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function Source() {
  return (
    <div className='source'>
      <div className="title">
        Kaynaklar
      </div>

      <div className="bottom">
        <div className="left">
          <h3>Kaynak İsimleri</h3>
          <span>Değerlendirme raporlarında yer alan kaynak isimlerini güncelleyebilir veya kaynak arttırabilirsiniz.</span>

        </div>
        <div className="right">
          <div className="item">
            <input required id="manager" name="manager" type="text" placeholder='Yönetici'/>
          </div>
          <div className="item">
            <input required id="equivalent" name="equivalent" type="text" placeholder='Eş Değer'/>
          </div>
          <div className="item">
            <input required id="subordinate" name="subordinate" type="text" placeholder='Ast'/>
          </div>
          <div className="item">
            <input required id="other" name="other" type="text" placeholder='Diğer'/>
          </div>
          <div className="item">
            <input required id="self" name="self" type="text" placeholder='Kendi'/>
          </div>
          <div className="buttons">
          <Tooltip title="Daha fazla katılımcı eklemek için “+” butonuna basınız" placement="bottom">
            <IconButton className='plusButtonCover'>
             <ControlPointOutlinedIcon className='plusButton' />
            </IconButton>
          </Tooltip>
          <button className='saveButton'>Kaydet</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
