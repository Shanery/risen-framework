interface Relationship {
  edgeName: string;
  linkedName: string | string[];
  edgeSchema?: EdgeSchema;
}

interface EdgeLink {
  id: id;
  resource_type: resource_type;
}

interface Edge {
  id: id;
  resource_type: resource_type;

  out: id;
  out_type: resource_type;

  in: id;
  in_type: resource_type;

  data: {
    [key: string]: unknown;
  };
}

interface EdgeSchema {
  [key: string]: {
    type: 'basic';
    value_type: 'string' | 'boolean' |'number';
  } | {
    type: 'resource';
    value_type: resource_type | resource_type[];
    linked_by?: EdgeSchemaLink[];
  };
}

interface EdgeSchemaLink {
  // Of the edge, do we get the data from in or out of edge.
  sourceDirection: 'in' | 'out';
  // When we had determined with side, which linked elements can we choose from?
  edgeName: edge_name;
  direction: 'in' | 'out';
}
