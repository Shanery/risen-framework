export const testAction = (action: (context: {
  state: unknown;
  getters: unknown;
  commit: unknown;
  dispatch: unknown;
}, payload: any) => unknown, payload, context, expectedMutations, done) => {
  let count = 0

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(type).toEqual(mutation.type)
      expect(payload).toStrictEqual(mutation.payload)
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  // call the action with mocked store and arguments
  action({ 
    ...context,
    commit,
  }, payload)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).toEqual(0)
    done()
  }
}

function generateEndpoint(endpoint: string): string {
  return endpoint.match(/^http/i)
    ? endpoint
    : '/base' + endpoint;
}

export const MockContext = (VuexModule):VuexContext => {
  const {
    state = {},
    getters = {},
    mutations = {},
    actions = {},
  }: VuexModule = VuexModule;

  const mappedGetters: {
      [key: string]: unknown;
    } = {}

  Object.entries(getters).forEach(([key, func]: [string, (state, getters) => any]) => {
    Object.defineProperty(mappedGetters, key, {
      get: () => func(state, mappedGetters),
      set: () => {},
    })
  })

  const context = {
    state,
    getters: mappedGetters,
    mutations,
    actions,

    async dispatch(action, payload?: any) {
      const dispatchAction = actions[action];
      if (!dispatchAction) throw new Error(`vuex action '${action}' doesn't exist`)
      return dispatchAction(context, payload)
    },
    commit(mutation, payload?: any) {
      const commitMutation = mutations[mutation];
      if (!commitMutation) throw new Error(`vuex mutation '${mutation}' doesn't exist`)
      return commitMutation(state, payload)
    },
  }

  return context
}

export const MockAPI = {
  get(endpoint, returnCode = 200, mockResponse = "Success") {
    switch (returnCode) {
    case 200:
      return mockResponse
    
    default:
      throw new Error(`GET ${generateEndpoint(endpoint)} Code: ${returnCode}`)
    }
  },
  get_all(endpoint, returnCode = 200, mockResponse = "Success") {
    console.log(returnCode)

    switch (returnCode) {
    case 200:
      return mockResponse
    
    default:
      throw new Error(`GET ${generateEndpoint(endpoint)} Code: ${returnCode}`)
    }
  },

  post(endpoint, data, returnCode = 200, mockResponse = "Success") {
    switch (returnCode) {
    case 200:
      return mockResponse
    
    default:
      throw new Error(`POST ${generateEndpoint(endpoint)} Code: ${returnCode}`)
    }
  },

  update(endpoint, data, returnCode = 200, mockResponse = "Success") {
    switch (returnCode) {
    case 200:
      return mockResponse
    
    default:
      throw new Error(`UPDATE ${generateEndpoint(endpoint)} Code: ${returnCode}`)
    }
  },

  delete(endpoint, data, returnCode = 200, mockResponse = "Success") {
    switch (returnCode) {
    case 200:
      return mockResponse
    
    default:
      throw new Error(`DELETE ${generateEndpoint(endpoint)} Code: ${returnCode}`)
    }
  },
}
