import React from 'react'
import "./sideNavbar.scss"

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import PollIcon from '@mui/icons-material/Poll';
import MessageIcon from '@mui/icons-material/Message';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import Button from '@mui/material/Button';

export default function SideNavbar() {
  return (
    <div className='container'>
      <Accordion className='accordion'>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={<ArrowDropDownIcon />}
        >
          Performans Değerlendirme
        </AccordionSummary>
        <AccordionDetails className='sideNavbar'>
            <a href="/"><PollIcon/>Değerlendirmeler</a>
            <a href="/"><PersonIcon/>Katılımcılar</a>
            <a href="/"><MessageIcon/>Yetkinlikler</a>
            <a href="/"><ModeStandbyIcon/>Hedef Paketleri</a>
            <a href="/"><ViewTimelineIcon/>Şablonlar</a>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
