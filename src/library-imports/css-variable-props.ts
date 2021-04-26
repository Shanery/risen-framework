const modifierProps = (props: {
    [propName: string]: {
      type: string;
      default?: string | string[] | boolean | boolean[];
    };
  }) => {
  const mixin = {
    props: {},

    computed: {
      modifierProps () {
        return props
      },
    },
  }

  Object.entries(props).forEach(([
    propName,
    config,
  ]) => {
    // Create Prop
    mixin.props[propName] = {
      type: [Array, String, Boolean],
      default: config.default,
    }
  })

  return mixin
}

const cssVarProps = (props: {
    [propName: string]: {
      constantKey?: string;
      default?: string | string[];
      usesComputed?: boolean;
      overwrite?: boolean;
    };
  }) => {
  const mixin = {
    props: {},

    computed: {
      cssVarProps () {
        return props
      },
    },
  }

  Object.entries(props).forEach(([
    propName,
    config,
  ]) => {
    // Create Prop
    mixin.props[propName] = {
      type: [Array, String],
      default: config.default,
    }
  })

  return mixin
}

export { cssVarProps, modifierProps }
