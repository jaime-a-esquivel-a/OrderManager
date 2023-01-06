const canvasForChart = document.getElementById("Chart");


async function createChart () {
  const response  = await fetch( '/chartdata', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  });

if(response.ok){
  let data = await response.json();
  let labelsData = [];
  let dataSet = [];
  for (let i = 0; i < data.length; i++){
    labelsData.push(data[i].orderstatus.name);
    dataSet.push(data[i].total);
  }
  new Chart (canvasForChart, {
    type: 'doughnut',
    data: {
        labels: labelsData,
        datasets: [{
          label: 'Quantity',
          data: dataSet,
          borderWidth: 1
        }]
      },
      options: {
      }
    }); 
}else{
  alert('Error when getting data for chart');
}

  
}

createChart();


