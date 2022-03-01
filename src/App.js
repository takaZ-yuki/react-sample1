import { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 初期値を設定
      isLive: false,
      curTime: 0,
      startTime: 0
    };
  }

  // マウントした時
  componentDidUpdate() {
    this.timerId = setInterval((e) => {
      this.tick();
    }, 1000);
  }

  // アンマウントした時
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  // 毎秒実行される
  tick() {
    if (this.state.isLive) {
      const v = new Date().getTime();
      this.setState({ curTime: v });
    }
  }

  // 開始・停止ボタンを押したとき
  clickHandler(e) {
    // 停止する時
    if (this.state.isLive) {
      this.setState({ isLive: false });
      return;
    }

    // 開始するとき
    const v = new Date().getTime();
    this.setState({
      curTime: v,
      startTime: v,
      isLive: true
    });
  }
  // 時刻表示ディスプレイ
  getDisp() {
    const s = this.state;
    const dalta = s.curTime - s.startTime;
    const t = Math.floor(dalta / 1000);
    const ss = t % 60;
    const m = Math.floor(t / 60);
    const mm = m % 60;
    const hh = Math.floor(mm / 60);
    console.log(ss);
    console.log(m);
    console.log(mm);
    console.log(hh);
    const z = (num) => {
      const s = "00" + String(num);
      return s.substring(s.length - 2, 2);
    };
    return (
      <span>
        {z(hh)}:{z(mm)}:{z(ss)}
      </span>
    );
  }

  // 画面描画
  render() {
    let label = "START";
    if (this.state.isLive) {
      label = "STOP";
    }
    const disp = this.getDisp();
    const fclick = (e) => this.clickHandler(e);
    return (
      <div className="Stopwatch">
        <div>{disp}</div>
        <button onClick={fclick}>{label}</button>
      </div>
    );
  }
}

export default App;
