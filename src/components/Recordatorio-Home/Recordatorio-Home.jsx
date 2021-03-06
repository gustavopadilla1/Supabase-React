import AppBar from '../../components/AppBar';
import { Card } from '../Card';
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";




export default function RecordatorioHome({session}) {
    const [,setLoading] = useState(true);
    const [titulo, setTitulo] = useState(null);

     const [id, setid] = useState(null);
    const [fechacreacion, setFechaCreacion] = useState(null);
    const [contenido, setContenido] = useState(null);
    const [fecharecordatorio, setFechaRecordatorio] = useState(null);
    

    useEffect(() => {
        getRecordatorios();
    }, [session]);


    const { i18n, t } = useTranslation();
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };


    async function getRecordatorios() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("recordatorio")
                .select(`*`)
                .eq("id", user.id)
                .single(); 

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
               setid(data.id);
                
                setTitulo(data.titulo);
                setFechaCreacion(data.fechacreacion);
                setContenido(data.contenido);
                setFechaRecordatorio(data.fecharecordatorio);
                
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }


    
    async function EliminarRecordatorio() {
        try {

                const { data, error } = await supabase
                .from('recordatorio')    
                .delete()    
                .eq('id',id )

                setLoading(true);
                   
            if (error) {
                throw error;
            }
            if (data) {
                setid(data.id);
                 
                 setTitulo(data.titulo);
                 setFechaCreacion(data.fechacreacion);
                 setContenido(data.contenido);
                 setFechaRecordatorio(data.fecharecordatorio);
                 
             }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
            getRecordatorios();
        }
    }


    return (
        
        <div>
         <AppBar/> 
        
         <h4>{t("welcome")}</h4>
         <h4>{t("Change language")}</h4>
         
         
             
         <Button variant="contained" color='success' 
            className={`App-link ${
              i18n.language === "es" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("es")}
          >
            {t("Spanish")}
          </Button>
        
          <Button variant="contained" color='error'
            className={`App-link ${
              i18n.language === "en" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("en")}
          >
            {t("English")}
           
            </Button> 
            <br></br><br></br>
        
         <Button variant="contained">
        < Link to="/AddRecordatorio">
        {t("New Reminder")}
         </Link>
         </Button>

        
        <Grid container padding={10} spacing={7} className="CARD">
        <Grid item xs={12} sm={6} md={4} >
            <Card
            id={id}
            titulo={titulo}                                 
             contenido={contenido}
              fechacreacion={fechacreacion}
              fecharecordatorio={fecharecordatorio}               
                        >       
                        
       
        
            </Card>
            <Button variant="contained" size="small" color="primary">
        <Link to="/Recordatorios">
        {t("Edit")}
        </Link>
        </Button> 
            <Button onClick={EliminarRecordatorio} variant="contained" size="small" color="error">
            {t("Delete")}
        </Button>
         
                <br></br>            
            </Grid>
    </Grid>
        </div>
    );
}
