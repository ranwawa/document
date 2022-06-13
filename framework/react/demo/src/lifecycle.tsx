import React, { useState } from 'react';

interface Props {
  value: number;
  updateProps: () => void;
  destroyComp: () => void;
}

interface State {
  hasError: boolean;
}

function ErrorComp(props: Props) {
  if (props.value === 2) {
    throw new Error('故意弄个异常');
  }

  return <div>子组件</div>;
}

class NormalComp extends React.Component<Props, State> {
  constructor(props: Props) {
    console.log('mounting:constructor');
    super(props);
    // 1. 为什么this必须在super之后执行
    // 2. 为什么不初始化state，在getDerivedStateFromProps中会有警告
    this.state = { hasError: false };
  }
  static getDerivedStateFromProps() {
    console.log('mounting/updating:getDerivedStateFromProps');

    return null;
  }
  shouldComponentUpdate(props, state) {
    // 3. getDerivedStateFromError返回了true，为什么这个钩子还要执行2次？
    console.log(
      'updating: shouldComponentUpdate',
      JSON.stringify(props),
      JSON.stringify(state)
    );

    return true;
  }
  getSnapshotBeforeUpdate() {
    console.log('updating: getSnapshotBeforeUpdate');
    return null;
  }

  render() {
    console.log('mounting/updating:render', this.state.hasError);

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return <ErrorComp {...this.props} />;
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.updateProps();
    }, 3000);
    console.log('mounting:componentDidMount');
  }
  componentDidUpdate() {
    // setTimeout(() => {
    // this.props.destroyComp();
    // }, 3000);
    console.log('updating: componentDidUpdate');
  }
  componentWillUnmount() {
    console.log('unmounting: componentWillUnmount');
  }
  static getDerivedStateFromError() {
    console.log('erroring: getDerivedStateFromError');
    return { hasError: true };
  }
  componentDidCatch() {
    console.log('erroring: componentDidCatch');
  }
}

export function LifeCycleClass() {
  let [lifeCycleProp, setLifeCycleProp] = useState(1);

  function updateLifeCycleProps() {
    setLifeCycleProp(2);
  }

  function destroyLifeCycleComponent() {
    setLifeCycleProp(-1);
  }

  return (lifeCycleProp !== -1 && (
      <NormalComp
        value={lifeCycleProp}
        updateProps={updateLifeCycleProps}
        destroyComp={destroyLifeCycleComponent}
      />
    ));
}
