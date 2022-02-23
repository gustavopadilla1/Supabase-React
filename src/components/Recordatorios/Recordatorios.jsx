import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import AppBar from '../../components/AppBar';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

export default function Recordatorios({ session }) {
    const [loading, setLoading] = useState(true);
    const [titulo, setTitulo] = useState(null);
    const [fechacreacion, setFechaCreacion] = useState(null);
    const [contenido, setContenido] = useState(null);
    const [fecharecordatorio, setFechaRecordatorio] = useState(null);
    

    useEffect(() => {
        getRecordatorios();
    }, [session]);

    // useEffect(() => {
    //     changeLaguage();
    // },);    
    //   const { i18n, t } = useTranslation();
      
    //   const changeLaguage = (language) => {
    //     i18n.changeLanguage(language);
    //   };

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
               console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function EditarRecordatorio({ titulo, fechacreacion, contenido, fecharecordatorio  }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id: user.id,
                titulo, 
                fechacreacion, 
                contenido, 
                fecharecordatorio,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("recordatorio").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        
        <div className="form-widget">
         <AppBar/>

            <div>
                <label htmlFor="email">                
                {/* {t("Email")} */}
                Correo Electronico
                </label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="titulo">
                    {/* {t("Title")} */}
                    Titulo
                    </label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo || ""}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fechacreacion">
                    {/* {t("Creation date")} */}
                    Fecha de Creacion
                    </label>
                <input
                    id="fechacreacion"
                    type="Date"
                    value={fechacreacion || ""}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="contenido">
                    {/* {t("Contents")} */}
                    Contenido
                    </label>
                <input
                    id="contenido"
                    type="text"
                    value={contenido || ""}
                    onChange={(e) => setContenido(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fecharecordatorio">
                    {/* {t("Reminder date")} */}
                    Fecha de Recordatorio
                    </label>
                <input
                    id="fecharecordatorio"
                    type="Date"
                    value={fecharecordatorio || ""}
                    onChange={(e) => setFechaRecordatorio(e.target.value)}
                />
            </div>
           

            <div>
                <Button
                    className="button block primary"
                    onClick={() =>
                        EditarRecordatorio({ titulo, fechacreacion, contenido, fecharecordatorio })
                    }
                    disabled={loading}
                >
                    <Link to="/">
                    {loading ? "Loading ..." : "Update"}
                    </Link>
                </Button>
            </div>                   
            
        </div>
    );
}
