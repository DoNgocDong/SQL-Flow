(function() {
  document.getElementById('visualize').addEventListener('click', async () => {
    const sqlText = editor.getValue();
    
    try {
      const {data} = await axios({
        method: 'POST',
        url: '/visualize',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {sqlText}
      });
  
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  })
})()