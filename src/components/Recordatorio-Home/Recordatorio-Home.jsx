import AppBar from '../../components/AppBar';
import { Card } from '../Card';
import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';




export default function RecordatorioHome({session}) {
    const [,setLoading] = useState(true);
    const [titulo, setTitulo] = useState(null);
    const [fechacreacion, setFechaCreacion] = useState(null);
    const [contenido, setContenido] = useState(null);
    const [fecharecordatorio, setFechaRecordatorio] = useState(null);
    

    useEffect(() => {
        getRecordatorios();
    }, [session]);

    async function getRecordatorios() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("recordatorio")
                .select(`titulo, fechacreacion, contenido, fecharecordatorio `)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
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
    return (
        
        <div>
         <AppBar/> 
         <p>Bievenidos</p>

         <Button variant="contained">
        < Link to="/AddRecordatorio">
         Nuevo Recordatorio
         </Link>
         </Button>

        
        <Grid container padding={10} spacing={7} className="CARD">
        <Grid item xs={12} sm={6} md={4} >
            <Card
            titulo={titulo}                                 
             contenido={contenido}
              fechacreacion={fechacreacion}
              fecharecordatorio={fecharecordatorio}
            />  

                <br></br>
            <Card/>
            </Grid>
    </Grid>
        </div>
    );
}
