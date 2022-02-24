import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabaseClient'
 
export default function Avatar({ url, size, onUpload }) {
  const [imgperfiles_url, setImgperfiles_url] = useState(null)  
  const [uploading, setUploading] = useState(false) 

  useEffect(() => {
    if (url) downloadImage(url) 
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('ImgPerfiles').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setImgperfiles_url(url)
    } catch (error) {
      console.log('falla de descarga de imagen: ', error.message)
    }
  }


  async function uploadImgPerfiles(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debe seleccionar una imagen para subir.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('ImgPerfiles')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {imgperfiles_url ? (
        <img
          src={imgperfiles_url ?? "https://www.emsevilla.es/wp-content/uploads/2020/10/no-image-1.png"}
          alt="imgperfiles_url"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadImgPerfiles}
          disabled={uploading}
        />
      </div>
    </div>
  )
}