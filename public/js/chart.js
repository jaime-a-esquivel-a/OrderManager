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
  console.log(data);
  new Chart (canvasForChart, {
    type: 'doughnut',
    data: {
        labels: ['Ordered', 'Build', 'Ready', 'In Transit', 'Delivered', 'Declined'],
        datasets: [{
          label: 'Quantity',
          data: [12, 19, 3, 5, 2, 3],
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


