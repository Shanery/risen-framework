<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      boxExample:
`<a-box
  bg-color="grey-70"
  color="white"

  :border-radius="['small','medium','large']"
  :padding="['small','medium','large']"
>
  Contents
</a-box>`,
      customButton: 
`<a-button
  color-a="grey-30"
  color-b="grey-70"
  color-c="grey-50"
  color-d="grey-70"

  border="1px solid-grey-30"
  border-radius="5px"
>
  Custom Button
</a-button>`,
      neutralButton: 
`<a-button
  variant="neutral"
>
  Custom Button
</a-button>`,
      exampleConstants:
`{
  spacing: {
    xxsmall: '4px',
    xsmall: '8px',
    small: '12px',
    'gutter-small': '16px',
    gutter: '20px',
    'gutter-large': '32px',
    medium: '24px',
    large: '40px',
    xlarge: '52px',
    xxlarge: '80px',
    xxxlarge: '180px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',

    'mx-auto': '0 auto',
  },
  limit: {
    mobile: '400px',
    xsmall: '500px',
    small: '725px',
    medium: '1000px',
    large: '1200px',
    xlarge: '1440px',
  },
  color: {
    primary: '#2F736C',

    'green-100': '#020E0D',
    'green-80': '#173532',
    'green-60': '#2F736C',
    'green-40': '#49A669',
    'green-30': '#96D8D1',
    'green-10': '#DEF7F5',
  },
  // ...
}`,
      cardIssue: 
`<a-box 
  border-radius="medium"
  bg-color="grey-70"
  padding="medium"
  width="300px"
  color="white"
>
  <a-heading level="3" 
    size="4"
  >
    Example Card
  </a-heading>
  <a-text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
    Nulla illo deserunt id expedita et provident sed perferendis iusto, 
    asperiores vel illum sit iure fugiat, nemo blanditiis, 
    laudantium dolorem sint quisquam?
  </a-text>
</a-box>`,
      cardFixed: 
`<a-box 
  border-radius="medium"
  bg-color="grey-70"
  padding="medium"
  width="300px"
  color="white"
>
  <v-stack spacing="small">
    <a-heading level="3" 
      size="4"
    >
      Example Card
    </a-heading>
    <a-text>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      Nulla illo deserunt id expedita et provident sed perferendis iusto, 
      asperiores vel illum sit iure fugiat, nemo blanditiis, 
      laudantium dolorem sint quisquam?
    </a-text>
  </v-stack>
</a-box>`,
      horizontalStack:
`<h-stack spacing="small">
  <a-box 
    v-for="i in 5"
    :key="i"
    width="30px"
    height="30px"
    bg-color="red"
    padding="4px 11px"
  >
    {{ i }}
  </a-box>
</h-stack>`,
      verticalStack:
`<h-stack spacing="small">
  <a-box 
    v-for="i in 5"
    :key="i"
    width="30px"
    height="30px"
    bg-color="red"
    padding="4px 11px"
  >
    {{ i }}
  </a-box>
</h-stack>`,
    }
  },
});
</script>

<template>
  <v-stack class="body"
    spacing="medium"
  >
    <a-heading level="1">
      Risen Design System
    </a-heading>

    <a-heading level="3">
      Concepts
    </a-heading>

    <a-list>
      <li>
        <a href="#atomic-components">
          Responsive Semantic Atomic Components
        </a>
      </li>
      <li>
        <a href="#theming">
          Theming
        </a>
      </li>
      <li>
        <a href="#variants">
          Variant System
        </a>
      </li>
      <li>
        <a href="#layout-components">
          Layout Components
        </a>
      </li>
    </a-list>

    <a-heading id="atomic-components">
      Responsive Atomic Semantic Components
    </a-heading>

    <a-text>Risen Design uses atomic elements to compose more complex UI. An example of something written in Risen Design can be seen below</a-text>

    <code-block 
      language="vue"
      :code="boxExample"
    />

    <a-box
      bg-color="grey-70"
      color="white"

      :border-radius="['small','medium','large']"
      :padding="['small','medium','large']"
    >
      Contents
    </a-box>

    <a-text weight="bold">
      Features
    </a-text>
    <a-list>
      <li>
        <a-text weight="bold">
          Prop Based Styling
        </a-text>
        <a-text>Rather than inline styles and classes we send options down as props</a-text>
      </li>
      
      <li>
        <a-text weight="bold">
          Semantic Values
        </a-text>
        <a-text>
          An important aspect of keeping designs consistent and easy to read is the use of variables. As you can see above, we use variables such as 'grey-70', and 'small' to describe things.
        </a-text>
      </li>
      <li>
        <a-text weight="bold">
          Responsive Values
        </a-text>
        <a-text>
          Lastly, all such props are can be made responsive by sending the props as an array of values based on breakpoints. Try Resizing the browser to see the padding and border radius of the box change responsively. If less than the total number of breakpoints are used, all higher breakpoints will default to the last breakpoint value provided. eg: <code>['small', 'medium']</code> -> same as <code>['small', 'medium', 'medium']</code> 
        </a-text>
      </li>
    </a-list>

    <a-text>
      One key design choice has been to design atomic components with limited styling options. This keeps the behavior and styling extremely standardized and easy to parse for other members. If an escape hatch is required: regular css styling or inline styles can be used.
    </a-text>

    

    <a-text>
      <a-text weight="bold"
        tag="span"
      >
        Motivations
      </a-text><br>
      As people have been writing more and more GUI elements, they have noticed that separating the styling from the markup is an antipattern. Any edits to the styling and layout, generally affects the markup as well. By separating things out, you have to find the corresponding CSS for the HTML or vice versa, making editing styles a longer process than it needs to be. 
    </a-text>

    <a-text>
      Consequently tools for CSS in JS, Tailwind CSS, etc, have been taking over the front-end world.<br>
      Most CSS in JS approaches has certain limitatations such as responsiveness, while class based approaches like tailwind have to generate every possible class and modifier combination to achieve the same result. Risen takes an approach similar to "Braid Design System" in trying to solve both of these problems.
    </a-text>
    

    <a-text weight="bold">
      More Resources
    </a-text>
    <router-link to="/">
      <a-text weight="bold">
        Create your own Element & Layout Components
      </a-text>
    </router-link>

    <!-- Theming -->
    <a-heading id="theming">
      Theming/Styling Components
    </a-heading> 
    
    <a-text weight="bold">
      All semantic values of code are defined in <code>constants.ts</code>.
    </a-text>

    <code-block 
      :code="exampleConstants"
    />

    <a-text>
      To understand how these values are used, read the <router-link to="/">
        <a-text weight="bold"
          tag="span"
        >
          Create your own Element & Layout Components
        </a-text>
      </router-link>
    </a-text>

    <a-text>
      <a-text weight="bold"
        tag="span"
      >
        Motivations
      </a-text><br>
      Obviously, most applications will have their own custom styling. To have a single component library for multiple projects, the components needs to be themable. The team at Tailwind have been trying to achieve this with "Headless UI".
    </a-text>

    <a-heading id="variants">
      Variants
    </a-heading>

    <a-text>
      Variants are a way of defining other styled versions of the same components.
    </a-text>

    <code-block
      language="vue"
      :code="`<a-button>
  Default Button
</a-button>`"
    />

    <a-button>
      Default Button
    </a-button>

    <code-block language="vue"
      :code="customButton"
    />
    <a-button
      color-a="grey-30"
      color-b="grey-70"
      color-c="grey-50"
      color-d="grey-70"

      border="1px solid-grey-30"
      border-radius="5px"
    >
      Custom Button
    </a-button>

    <a-text>
      While it's convenient to define these values for a specific button, it becomes cumbersome when you have to reuse the same styled button again. That's where variants come into play. Within the component, you can define the computed property <code>variants</code>.
    </a-text>

    <code-block 
      language="typescript"
      :code="`const buttonVariants = {
  default: {
    colorA: 'white',
    colorB: 'green-60',
    colorC: 'white',
    colorD: 'green-80',

    border: 'none',
    borderRadius: '5px',
  },
  neutral: {
    colorA: 'grey-30',
    colorB: 'grey-70',
    colorC: 'grey-50',
    colorD: 'grey-70',

    border: '1px solid grey-30',
    borderRadius: '5px',
  },
}`"
    />

    <a-text>With these variants you can set the default props for these variants. They will then be overwritten by any further props. With the above variant, you can simply write the following to achieve the same result</a-text>

    <code-block
      language="vue"
      :code="neutralButton"
    />
    
    <a-button
      variant="neutral"
    >
      Custom Button
    </a-button>

    <a-text>
      Sometimes props are not enough to describe a particular variant. To handle this, Variants also adds <code>class="type-variant"</code> to the element. You can write custom css rules for handling these, allowing you to add more styles to the variants.
    </a-text>

    <!-- Layout Components -->
    <a-heading id="layout-components">
      Layout Components
    </a-heading>

    <a-text>Risen provides a set of layout components for handling the positioning of elements.</a-text>

    <a-text weight="bold">
      Horizontal Stack
    </a-text>
    <code-block :code="horizontalStack" />
    <h-stack spacing="small">
      <a-box 
        v-for="i in 5"
        :key="i"
        width="30px"
        height="30px"
        bg-color="red"
        padding="4px 11px"
      >
        {{ i }}
      </a-box>
    </h-stack>

    <a-text weight="bold">
      Vertical Stack
    </a-text>
    <code-block :code="verticalStack" />
    <v-stack spacing="small">
      <a-box 
        v-for="i in 5"
        :key="i"
        width="30px"
        height="30px"
        bg-color="red"
        padding="4px 11px"
      >
        {{ i }}
      </a-box>
    </v-stack>

    <a-text>
      <a-text weight="bold"
        tag="span"
      >
        Motivations
      </a-text><br>
      Elements that define the whitespace around them makes it easier to style in only one context. Once that context changes, you have to overwrite the margins with more specific rules. As contexts become more complex, you are often fighting the cascade to ensure the correct level of specificity. 
    </a-text>

    <code-block
      language="vue"
      :code="cardIssue"
    />
    <a-box 
      border-radius="medium"
      bg-color="grey-70"
      padding="medium"
      width="300px"
      color="white"
    >
      <a-heading level="3" 
        size="4"
        style="margin: 1em 0;"
      >
        Example Card
      </a-heading>
      <a-text
        style="margin: 1em 0;"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla illo deserunt id expedita et provident sed perferendis iusto, asperiores vel illum sit iure fugiat, nemo blanditiis, laudantium dolorem sint quisquam?
      </a-text>
    </a-box>

    <a-text>
      As you can see, the margin is being added to the padding of the card, leaving us with a large gap at the top and bottom. In general to Fix this I have to change the margin top of the heading, and the margin bottom of the paragraph text (to keep the spacing between the heading and the paragraph). This is fine, until you start fighting the cascade.
    </a-text>

    <a-text>
      <strong>The Solution?</strong><br>
      It's much easier to assume no margin, and let a parent component handle the spacing between elements of a specific layout. Here were are using a <code>&lt;v-stack&gt;</code> to achieve the spacing between the elements.
    </a-text>

    <code-block
      language="vue"
      :code="cardFixed"
    />
    <a-box 
      border-radius="medium"
      bg-color="grey-70"
      padding="medium"
      width="300px"
      color="white"
    >
      <v-stack spacing="small">
        <a-heading level="3" 
          size="4"
        >
          Example Card
        </a-heading>
        <a-text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla illo deserunt id expedita et provident sed perferendis iusto, asperiores vel illum sit iure fugiat, nemo blanditiis, laudantium dolorem sint quisquam?
        </a-text>
      </v-stack>
    </a-box>
      

    <a-text>
      For a list of layout components available: View the component list on the left.
    </a-text>

    <a-heading id="theming">
      Theming
    </a-heading>
    </code-block>
    </code-block>
  </v-stack>
</template>

