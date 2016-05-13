import React from 'react';

export default class Footer extends React.Component {
  render() {
    return(
    <footer id="footer">
         <ul>
          <li>
            <h2>关于我们</h2>
            <a href="#">团队博客</a>
          </li>
          <li>
            <h2>联系我们</h2>
            <a target="_blank" href="#">
              反馈和建议
            </a>
            <a target="_blank" href="#">
              讨论
            </a>
            <a target="_blank" href="#">
              报告 Bug
            </a>
          </li>
        </ul>
    </footer>
    )
  }
}