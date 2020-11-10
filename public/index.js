recibirSeries();
function recibirSeries() {
  fetch("/api/series")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let series = "";
      for (let i = 0; i < datos.length; i++) {
        series += `
            <div>
                <p>Titulo: ${datos[i].titulo}</p>
                <p>Plataforma: ${datos[i].plataforma}</p>
                <p>Nota: ${datos[i].nota}</p>
                
            </div>
        
        `;
      }
      document.getElementById("div1").innerHTML = series;
    });
}

function buscar() {
  const titulo = document.getElementById("tituloBuscar").value;

  fetch(`/api/series/${titulo}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      let serie = `
        <div>
            <h1>${datos[0].titulo}</h1>
           
        </div>
      `;

      document.getElementById("div2").innerHTML = serie;
    });
}

function anyadir() {
    const titulo = document.getElementById("titulo").value;
    const plataforma = document.getElementById("plataforma").value;
    const nota = document.getElementById("nota").value;
   
  
    const serie = {
      titulo,
      plataforma,
      nota,
    
    };
  
    fetch("/api/nuevaSerie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serie),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        console.log(datos);
      
      });
  }