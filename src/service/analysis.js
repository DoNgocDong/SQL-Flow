function getTable(graphTable) {
  const tables = {};

  tables.id = graphTable.id;
  tables.x = graphTable.x;
  tables.y = graphTable.y;
  tables.width = graphTable.width;
  tables.height = graphTable.height;

  tables.label = {
    content: graphTable.label.content,
    fontSize: graphTable.label.fontSize
  };

  tables.columns = graphTable.columns.map(col => {
    return {
      id: col.id,
      label: {
        content: col.label.content,
        fontSize: col.label.fontSize
      }
    }
  });

  return tables
}

const analysisData = function(graphData) {
  const {summary, sqlflow, graph} = graphData;

  const rootTable = summary.mostRelationTables.map(t => t.table.toLowerCase());
  const elements = {};

  elements.edges = graph.elements.edges;
  elements.tables = graph.elements.tables.map(el => getTable(el));


  return {rootTable, elements}
}

module.exports = analysisData;