import { MockContext, testAction } from './store-mocks'

describe('use mock context', () => {
  const {
    state,
    getters,
    commit,
    dispatch,
  } = MockContext({
    state: {
      counter: 0,
    },
    getters: {
      getCount(state) {
        return state.counter;
      },
    },
    mutations: {
      increment(state) {
        return ++state.counter;
      },
      decrement(state) {
        return --state.counter;
      },
      setCounter(state, value) {
        state.counter = value
      },
    },
    actions: {
      stateCount({ state }) {
        return state.counter
      },
      stateObject({ state }) {
        return state
      },
      getterCount({ getters }) {
        return getters.getCount
      },
      setCounter({ commit }, value) {
        commit('setCounter', value)
      },
      resetCounter({ dispatch }) {
        dispatch('setCounter', 0)
      },

    },
  })

  // Now you can test anything you want

  it('State Works as intended', () => {
    expect(state.counter).toStrictEqual(0)

    state.counter = 20

    expect(state.counter).toStrictEqual(20)
  })

  it('Getters Work as intended', () => {
    expect(getters.getCount).toStrictEqual(20)

    state.counter = 3

    expect(getters.getCount).toStrictEqual(3)

    getters.getCount = 30

    expect(getters.getCount).toStrictEqual(3)
  })

  it('Mutations Work as intended', () => {
    commit('increment')
    commit('increment')

    expect(state.counter).toStrictEqual(5)

    commit('decrement')

    expect(state.counter).toStrictEqual(4)

    commit('setCounter', 10)

    expect(state.counter).toStrictEqual(10)
  })

  describe('Actions work as intended', () => {
    it('State Context of Action works', async (done) => {
      const val = await dispatch('stateCount')
      expect(val).toStrictEqual(10)

      const stateObject = await dispatch('stateObject');

      stateObject.counter = 15;
      expect(state.counter).toStrictEqual(15)

      done()
    })

    it('Getter Context of Action works', async (done) => {
      const val = await dispatch('getterCount')
      
      expect(val).toStrictEqual(15)

      done()
    })

    it('Commit Context of Action works', () => {
      dispatch('setCounter', 20)

      expect(state.counter).toStrictEqual(20)
    })

    it('Dispatch Context of Action works', () => {
      dispatch('resetCounter')

      expect(state.counter).toStrictEqual(0)
    })
  })

  

})

describe('Test Actions work', () => {
  const vueModule = {
    state: {
      counter: 0,
    },
    getters: {
      getCount(state) {
        return state.counter;
      },
    },
    mutations: {
      increment(state) {
        return ++state.counter;
      },
      decrement(state) {
        return --state.counter;
      },
      setCounter(state, value) {
        state.counter = value
      },
    },
    actions: {
      stateCount({ state }) {
        return state.counter
      },
      stateObject({ state }) {
        return state
      },
      getterCount({ getters }) {
        return getters.getCount
      },
      setCounter({ commit }, value) {
        commit('setCounter', value)
      },
      resetCounter({ dispatch }) {
        dispatch('setCounter', 0)
      },

    },
  }
  it('Test Action Works', (done) => {
    testAction(vueModule.actions.setCounter, 3, MockContext(module),[{
      type: 'setCounter',
      payload: 3,
    }], done)
  })  
})

