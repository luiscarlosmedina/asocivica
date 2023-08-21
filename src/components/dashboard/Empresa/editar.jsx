import React, { useEffect, useState } from 'react';

export default function Editar({id}) {
    const [data, setData] = useState("");
  
    const handlePostData = async () => {
  
      const response = await fetch(
        "http://localhost/api/api.php?apicall=updateempresa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
  
      const data = await response.json();
      setData(data.contenido);
    };
  
    useEffect(() => {
      handlePostData();
    }, [id]);
    return (
        <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                    >
                        Tipo de novedad
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                        Descripcion tipo de novedad
                    </label>
                    <textarea
                        className="form-control"
                        id="message-text"
                    ></textarea>
                </div>
            </form>
        </div>
    )
}
