const initialState = {
    projects:[],
    statusText: '',
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_GET_PROJECTSINFO_REQUEST:
      return Object.assign({}, state, {
            'statusText': null
        });
      break;
    case PROJECT_GET_PROJECTSINFO_SUCCESS:
      return Object.assign({}, state, {
            'statusText': `获得项目成功`,
            'projects':action.payload.projects
        });
    case PROJECT_GET_PROJECTSINFO_FAILURE:
      return Object.assign({}, state, {
            'statusText': payload.statusText,
            'projects':[]
        });
  }
}