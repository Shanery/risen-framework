import createModule from '@/store/ResourceModule/createModule'
import { replaceRouteParams } from '@/store/ResourceModule/helpers'
import { MockAPI, MockContext } from './store-mocks';

import create_plugin from '@/store/ResourceModule/plugins/create.plugin'
import get_plugin from '@/store/ResourceModule/plugins/get.plugin'
import update_plugin from '@/store/ResourceModule/plugins/update.plugin'
import delete_plugin from '@/store/ResourceModule/plugins/delete.plugin'

import initializeResources from '@/store/ResourceModule/initializeResources';



describe('Resource Module Initializer', () => {
  const moduleList = [
    createModule({
      name: 'author',
      rootRoute: '/',
      pluralName: 'authors',
    }),
    createModule({
      name: 'berry',
      rootRoute: '/author',
      pluralName: 'berries',
    }),
  ]

  const {
    state,
    getters,
    dispatch,
    commit,
  } = MockContext(initializeResources(moduleList))

  test('correctly maps singular to plural', () => {
    expect(getters.singularToPlural('berry')).toMatch('berries')
    expect(getters.singularToPlural('author')).toMatch('authors')

    expect(()=> {
      getters.singularToPlural('fail')
    }).toThrow()
  });

  test('correctly maps plural to singular', () => {
    expect(getters.pluralToSingular('berries')).toMatch('berry')
    expect(getters.pluralToSingular('authors')).toMatch('author')

    expect(() => {
      getters.pluralToSingular('fail')
    }).toThrow()
  });

  test('correctly maps plural to singular', () => {
    expect(getters.pluralToSingular('berries')).toMatch('berry')
    expect(getters.pluralToSingular('authors')).toMatch('author')

    expect(() => {
      getters.pluralToSingular('fail')
    }).toThrow()
  });
});


describe('Resource Module Stores', () => {
  test('Creating Modules', () => {

    const testModule = createModule({
      name: 'author',
      rootRoute: '/',
      pluralName: 'authors',
      plugins: [
        [get_plugin, {}],
        [create_plugin, {}],
        [update_plugin, {}],
        [delete_plugin, {}],
      ],
    }, {
      state: {
        otherState: 'otherState',
      },
      getters: {
        otherGetter: () => 'otherGetter',
      },
      mutations: {
        otherMutation: () => 'otherMutation',
      },
      actions: {
        otherAction: () => 'otherAction',
      },
    })

    const {
      state,
      getters,
      mutations,
      actions,
    } = testModule;
    
    it('Creates the correct State', () => {
      expect(state).toStrictEqual({
        all_authors: {},
        otherState: 'otherState',
      })
    })

    it('Creates the correct getters', () => {
      expect(getters).toHaveProperty('all_authors');
      
      const getterValue = getters.all_authors(state);
      
      expect(getterValue).toBe(state.all_authors)
    })

    it('Creates the correct mutations', () => {
      expect(mutations).toHaveProperty('add_authors');

      const add_authors = mutations.add_authors;

      add_authors(state, {
        'id_1': {
          resource_type: "author",
          id: "id_1",
        },
        'id_2': {
          resource_type: "author",
          id: "id_2",
        },
      })
      
      expect(state.all_authors.id_1).toEqual({
        resource_type: "author",
        id: "id_1",
      })
      expect(state.all_authors.id_2).toEqual({
        resource_type: "author",
        id: "id_2",
      })
    })

    it('Creates the correct Actions', () => {
      expect(actions).toHaveProperty('get_author');

      expect(actions).not.toHaveProperty('get_all_authors');

      expect(actions).toHaveProperty('create_author');

      expect(actions).toHaveProperty('update_author');

      expect(actions).toHaveProperty('delete_author');

      // Type script stops other actions for being added
    })

    // Test extension overrides
    it('Overrides are happening in correct order', () => {

      const overrideTest = createModule({
        name: "berry",
        rootRoute: "/author",
        pluralName: "berries",
      }, {
        state: {
          all_berries: 'override',
        },
        getters: {
          linkResolver: () => () => {
            return 'Success'
          },
          all_berries: () => {
            return 'override'
          },
        },
        mutations: {
          add_berries: () => {
            throw new Error('Mutation successfully overwritten')
          },
        },
      })
     
      expect(overrideTest.state.all_berries).toBe('override');

      expect(overrideTest.getters.all_berries()).toBe('override');

      expect(() => {
        overrideTest.mutations.add_berries()
      }).toThrowError('Mutation successfully overwritten');
    })

    // Test Actual Actions Error Handling
    // Unsure

  })

  test("Replace Route Parameteres works", () => {
    it('Handles Good Inputs', () => {
      const testA = replaceRouteParams(
        '/test/:param_a/',
        {
          'param_a': 'a',
        }
      )
      
      expect(testA).toEqual('/test/a/')

      const testB = replaceRouteParams(
        '/foo/:foo/bar/:bar/',
        {
          'foo': 'f',
          'bar': 'b',
        }
      )
      
      expect(testB).toEqual('/foo/f/bar/b/')
    })

    it('Handles routes with incorrect root', () => {
      // Errors: 
      // No leading slash
      // No trailing slash, 
      // Has double slash from root using a trailing slash not existing.
      
      const testA = replaceRouteParams(
        'foo/:foo//bar/:bar',
        {
          'foo': 'f',
          'bar': 'b',
        }
      )
      expect(testA).toEqual('/foo/f/bar/b/')
    })

    it('Errors when Params provided are bad', () => {
      
      expect(() => {
        replaceRouteParams(
          '/foo/:bar/',
          {
            'baar': 'b',
          }
        )
      }).toThrowError(`Route Parameter: bar, not provided`)
    })
  })

  describe('Adding and Triggering Action Hooks',() => {
    const hooks = [
      "before_get_all_berries",
      "after_get_all_berries",

      "before_create_berry",
      "after_create_berry",

      "before_update_berry",
      "after_update_berry",

      "before_delete_berry",
      "after_delete_berry",
    ]

    const overrideActions = {
      addItemsToLocalDB: jest.fn(),
    }

    hooks.forEach(hook => {
      overrideActions[hook] = jest.fn();
    })

    const HooksTest = createModule({
      name: "berry",
      rootRoute: "/author",
      pluralName: "berries",
    }, {
      getters: {
        linkResolver: () => () => {
          return 'Success'
        },
      },
      actions: overrideActions,
    }, 
    MockAPI)

    const {
      dispatch,
    } = MockContext(HooksTest);

    test('Triggers All Actions', async (done) => {
      try {
        const data = await dispatch('get_all_berries', {})

        expect(data).toBe('Success');
      } 
      catch (error) {
        console.error(error);
      }

      try {
        const data = await dispatch('create_berry', {
          params: {
            berry_id: 'a',
          },
          data: {
            name: 'straw',
          },
        })

        expect(data).toBe('Success');
      } 
      catch (error) {
        console.error(error);
      }

      try {
        const data = await dispatch('update_berry',{
          params: {
            berry_id: 'a',
          },
          data: {
            name: 'rasp',
          },
        })

        expect(data).toBe('Success');
      } 
      catch (error) {
        console.error(error);
      }
      try {
        const data = await dispatch('delete_berry', {
          params: { berry_id: 'a' },
        })

        expect(data).toBe('Success');
      } 
      catch (error) {
        console.error(error);
      }

      expect(overrideActions.addItemsToLocalDB.mock.calls.length).toBe(3)

      hooks.forEach(hook => {
        try {
          expect(HooksTest.actions[hook].mock.calls.length).toBe(1);
        } catch (error) {
          console.error(error)
        }
      })

      done()
    })
  })
})
