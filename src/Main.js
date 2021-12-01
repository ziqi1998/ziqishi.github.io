/**
 * Created by Rychou on 2018/4/19.
 */
import React, { Component } from 'react'
import $ from 'jquery'
import url from './audio/gbqq.mp3' // 引入背景音乐文件


class Main extends Component {
    state = {
        date: {},
    }
    componentDidMount() {
        this.print();
        setInterval(() => {
            this.time(2019, 3, 9) // 
        }, 1000
        )
        var audio = document.getElementById("audio");
        setTimeout(() => audio.play(), 5000) // 背景音乐在页面加载后，延迟播放的时长，单位：毫秒。
    }
    print = () => {
        $.fn.autotype = function () {
            var _this = $(this);
            var str = _this.html();
            // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
            str = str.replace(/(\s){2,}/g, "$1");
            var index = 0;
            $(this).html('');
            var timer = function fn() {
                var args = arguments;
                var current = str.slice(index, index + 1);
                // html标签完整输出,如：<p>
                if (current == '<') {
                    index = str.indexOf('>', index) + 1;
                }
                else {
                    index++;
                }
                //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
                if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                    _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                } else {
                    _this.html(str.substring(0, index));
                    clearTimeout(timer);
                };
                setTimeout(fn, 200)
            };
            // 延迟1s开始
            setTimeout(timer, 500);
        };
        $("#autotype").autotype();
    }
    time = (year, month, day) => {
        var dateNow = new Date();
        var dateJNR = new Date(year, month - 1, day);
        // var anniversary = parseInt((dateNow - dateJNR) / (365*24*3600*1000))
        var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        var second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({ date: { d: d, hour: hour, minute: minute, second: second } });
    };
    render() {
        const date = () => {
            if (this.state.date.d !== undefined) {
                const { d, hour, minute, second } = this.state.date
                return (<p>我们已经一起走过了: <span className="date-text">{d}</span> 天 <span className="date-text">{hour}</span> 小时 <span className="date-text">{minute}</span> 分 <span className="date-text">{second}</span> 秒 </p>
                )
            }
        }
        return (
            <div className="App animated bounceInLeft">
                <div className="date">{date()}</div>
                <div id="autotype">
                    <h1 style={{ fontWeight: 900 }}>亲爱的孟女士！</h1>
                    <p >在煽情开始之前，先放首歌当背景音乐吧！</p>
                    <p>今天是我们在一起一千天啦，从2019年3月10号到现在一千个日日夜夜中间有各种各样的争吵也有
                        小确幸。分分合合走到了现在。
                    </p>
                    <p>还记得回国第一次见你牵起你的手，一下子忘掉了旅途中的疲劳。第一次一起吃饭，第一次一起逛街，第一次吵架，第一次出去旅游，第一次给女生布置房间，第一次给一个女生做饭。这一切至今还是历历在目。
                </p>
                    <p>过程具有美好和困难两面性。我们是异国恋，期间免不了各种争吵和不解。以及在国外这么多年我的价值观可能和国内也多少有点差异。
                        感谢你一直以来的包容和谅解。去年疫情期间给了我不少鼓励和帮助。我一直为去年那段时间的情绪化感到困窘。也做过一些不经意间伤害
                        到你的话和事情，是我的不对再次向你道歉。
                </p>
                    <p>每次你伤心难过时我也是感同身受总是后悔自己说出那些话但是又不知道怎么想你表达歉意。
                </p>
                    <p>我不善于文字表达，写这一个网页和说那么多话也就想表达“我爱你”这简单的三个字而已！”
                        好期待以后毕业回国后一起的生活，希望早点结束这扯淡的异国恋。
                </p>
                    <p>最后祝噜噜一直开心快乐！</p>
                    <div style={{ textAlign: 'right' }}>
                        <p>时梓淇</p>
                        <p>2021年12月2日</p>
                    </div>
                </div>
                <audio id="audio" src={url}></audio>
            </div>

        )
    }
}
export default Main