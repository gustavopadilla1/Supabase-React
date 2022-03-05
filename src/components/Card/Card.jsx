import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useEffect } from "react"; 

export default function MultiActionAreaCard({ id, titulo, fechacreacion, contenido, fecharecordatorio}) {
  
  useEffect(() => {
    changeLaguage();
},);

  const { i18n, t } = useTranslation();
  
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Card sx={{ display: 'flex', height:250, width:800 }}>
    
      <CardActionArea>    
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography gutterBottom variant="body2" component="div" color="blue">
          {/* color="text.secondary" */}
            ID:
            <Typography variant="body2" color="Black">
              {id} 
              </Typography>
          </Typography>
                     
          <Typography gutterBottom variant="body2" component="div" color="blue">
          {/* color="text.secondary" */}
          {t("Title")}
            <Typography variant="body2" color="Black">
              {titulo} 
              </Typography>
          </Typography>
           
          <Typography gutterBottom variant="body2" component="div" color="blue">
          {t("Contents")}
            <Typography variant="body2" color="Black">
              {contenido} 
              </Typography>
          </Typography>

          <Typography variant="body2" color="blue">
          {t("Creation date")}
            <Typography variant="body2" color="Black">
              {fechacreacion} 
              </Typography>
          </Typography>
          <Typography variant="body2" color="blue">
          {t("Reminder date")}
            <Typography variant="body2" color="Black">
              {fecharecordatorio} 
              </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
     
        
              
    </Card>
  );
}


