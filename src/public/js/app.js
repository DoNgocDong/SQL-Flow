(function() {
  // Hàm tìm cột dựa trên ID
  function findColumn(data, id) {
    for (const table of data.elements.tables) {
      for (const column of table.columns) {
        if (column.id === id) {
          return document.querySelector(`.table:nth-child(${data.elements.tables.indexOf(table) + 1}) .column:nth-child(${table.columns.indexOf(column) + 2})`);
        }
      }
    }
    return null;
  }

  function generateFlow(graphData) {
    const data = graphData;
    const chart = document.getElementById("table-flow");
  
    // Tạo bảng (tables)
    data.elements.tables.forEach(table => {
      const div = document.createElement("div");
      div.className = "table";
      div.style.left = `${table.x}px`;
      div.style.top = `${table.y}px`;
      div.style.width = `${table.width}px`;
      div.style.fontSize = table.label.fontSize;
      div.style.border

      if(data.rootTable.includes(table.label.content)) {
        div.style.backgroundColor = '#5CB85C'
      }
      else {
        div.style.backgroundColor = '#b85c92'
      }
  
      // Thêm label của bảng
      const label = document.createElement("div");
      label.className = "label";
      label.textContent = table.label.content;
      div.appendChild(label);
  
      // Thêm các cột
      table.columns.forEach(column => {
        const columnDiv = document.createElement("div");
        columnDiv.className = "column";
        columnDiv.textContent = column.label.content;
        columnDiv.style.fontSize = column.label.fontSize;
        div.appendChild(columnDiv);
      });
  
      chart.appendChild(div);
    });
  
    // Vẽ đường nối (edges)
    data.elements.edges.forEach(edge => {
      const source = findColumn(data, edge.sourceId);
      const target = findColumn(data, edge.targetId);
  
      if (source && target) {
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
  
        const line = document.createElement("div");
        line.className = "line";
  
        const x1 = sourceRect.x + sourceRect.width / 2;
        const y1 = sourceRect.y + sourceRect.height / 2;
        const x2 = targetRect.x + targetRect.width / 2;
        const y2 = targetRect.y + targetRect.height / 2;
  
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
        line.style.width = `${length}px`;
        line.style.height = "2px";
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transformOrigin = "0 0";
        line.style.transform = `rotate(${angle}deg)`;
  
        chart.appendChild(line);
      }
    });
  }

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
  
      generateFlow(data);
    } catch (err) {
      console.error(err);
      window.alert('Generate flow err => check console');
    }
  });
})()