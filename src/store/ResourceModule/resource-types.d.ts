type id = string
type resource_type = string
type edge_name = string

interface ResourceLink {
  resource_type: resource_type;
  id: id;
  [key: string]: any;
}

interface Resource {
  resource_type: resource_type;
  id: id;
  name?: string;
  [key: string]: any;
}

interface ResourceModuleSettings {
  name: string;
  pluralName: string;
  rootRoute: string;

  plugins?: PluginList;

}

interface ResourceModule {
  name: string;
  pluralName: string;
  rootRoute: string;

  state: {[key: string]: any};
  getters: {[key: string]: any};
  mutations: {[key: string]: any};
  actions: {[key: string]: any};
  plugins?: ((store) => any)[];
}

interface ResourcePlugin {
  (module: ResourceModule, API: ApiShape, settings: object | void): void;
}

interface ApiShape {
  get: (...args) => any;
  get_all: (...args) => any;
  post: (...args) => any;
  update: (...args) => any;
  delete: (...args) => any;
}

type PluginSettings = object;
type PluginList = Array<[ResourcePlugin, PluginSettings]>

interface VuexModule {
  state?: {
    [key: string]: any;
  };
  getters?: {
    [key: string]: (state, getters) => any;
  };
  mutations?: {
    [key: string]: (state: {
      [key: string]: any;
    }, payload: any) => void;
  };
  actions?: {
    [key: string]: (context: VuexContext, payload: any) => any;
  };

  plugins?: ((store) => void)[];

  modules: {
    [module_name: string]: VuexModule;
  };
}

interface VuexContext {
  state: {
    [key: string]: any;
  };
  getters: {
    [key: string]: any;
  };
  commit: (mutation: string, payload?: any) => void;
  dispatch: (action: string, payload?: any) => Promise;
}
