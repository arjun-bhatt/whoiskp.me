console.log('starting up!');
import $ from 'jquery';
import './style.scss';

let time = 0;

setInterval(() => {
    time += 1;
    $('#main').html(`You've been on this page for ${  time  } seconds`);}, 1000);