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
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

export default function SideNavbar() {
  return (
    <div className='container'>

      <a href="/home"><HomeIcon />Ana Sayfa</a>

      <Accordion className='accordion'>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={<ArrowDropDownIcon />}
        >
          <PersonIcon />Çalışanlar
        </AccordionSummary>
        <AccordionDetails className='sideNavbar'>
          <a href="/employees"><PeopleAltIcon />Tüm Çalışanlar</a>
          <a href="/"><BookmarkIcon />Pozisyonlar</a>
          <a href="/"><BadgeIcon />Bölümler</a>
        </AccordionDetails>
      </Accordion>

      <a href="/reports"><BarChartIcon />Raporlar</a>
      <a href="/settings"><SettingsIcon />Ayarlar</a>


      {/*  <Accordion className='accordion'>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          expandIcon={<ArrowDropDownIcon />}
        >
          Performans Değerlendirme <ArrowDropDownIcon/>
        </AccordionSummary>
        <AccordionDetails className='sideNavbar'>
          <a href="/"><PollIcon />Değerlendirmeler</a>
          <a href="/"><PersonIcon />Katılımcılar</a>
          <a href="/"><MessageIcon />Yetkinlikler</a>
          <a href="/"><ViewTimelineIcon />Şablonlar</a>
        </AccordionDetails>
      </Accordion> */}

      <span>Performans Değerlendirme <ArrowDropDownIcon /></span>

      <a href="/reviews"><PollIcon />Değerlendirmeler</a>
      <a href="/"><PersonIcon />Katılımcılar</a>
      <a href="/"><MessageIcon />Yetkinlikler</a>
      <a href="/"><ViewTimelineIcon />Şablonlar</a>

      <a href="/settings">Hedef Değerlendirme<ArrowRightIcon /></a>
    </div>
  );
}
