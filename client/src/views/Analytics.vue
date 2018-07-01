<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Text Analytics</h3>
        <form>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Enter Text</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="text"></textarea>
          </div>
          <button type="button" class="btn btn-primary mb-2" @click="text_analysis">Analyse Text</button>
        </form>
      </div>
      <div class="col-md-6">
        <tree-view :data="text_result" :options="{maxDepth: 3}"></tree-view>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div class="row">
      <div class="col-md-6">
        <h3>Image Analytics</h3>
        <div class="row">
          <img :src="selected_image" alt="" width="250" height="300" class="image--padded"/>
        </div>
        <div class="d-flex flex-row">
          <div class="p-2" v-for="img in images">
            <img :src="img" alt="" width="120" height="160" @click="select_image(img)" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="col-md-12 col-md-offset-4">
          <div v-show="loading">
          <Spinner name="wave" color="#6d8fff"/>
          <span>Calculating...</span>
        </div>
        </div>
        <div class="padded">
          <label for="nudity">Nudity</label>
          <div class="progress" style="height: 30px;">
            <div class="progress-bar" role="progressbar" :style="{ width: `${nudity_percent}%` }" :aria-valuenow="nudity_percent" aria-valuemin="0" aria-valuemax="100">{{nudity_percent}}%</div>
          </div>
          <br />
          <label for="offensive">Offensive</label>
          <div class="progress" style="height: 30px;">
            <div class="progress-bar" role="progressbar" :style="{ width: `${offensive_percent}%` }" :aria-valuenow="offensive_percent" aria-valuemin="0" aria-valuemax="100">{{offensive_percent}}%</div>
          </div>
          <br />
          <label for="alchol">Alchol</label>
          <div class="progress" style="height: 30px;">
            <div class="progress-bar" role="progressbar" :style="{ width: `${alchol_percent}%` }" :aria-valuenow="alchol_percent" aria-valuemin="0" aria-valuemax="100">{{alchol_percent}}%</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <hr />
    <br />    
    <div class="row">
      <div class="col-md-12">
          <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 @play="onPlayerPlay($event)">
          </video-player>
      </div>
    </div>
    <br />
    <br />
      <hr />
      <br />
      <br />
    <div class="row">
        <tree-view :data="video_result" :options="{maxDepth: 3}"></tree-view>
      </div>
      <br />
    <br />
      <hr />
      <br />
      <br />
      <div class="row">
        <div class="col-md-12">
         <line-example chartId="chart-line-01"/>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <h3>URL Analytics</h3>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Link</th>
      <th scope="col">18+ Ads</th>
      <th scope="col">18+ Websites</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(link,index) in links">
      <td>{{index+1}}</td>
      <td>{{link.date}}</td>
      <td>{{link.link.text}}</td>
      <td>{{link.porn_ads}}</td>
      <td>{{link.porn_site}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import axios from 'axios';
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import LineExample from './charts/LineExample'
// LineChart.js
import { Line } from 'vue-chartjs';
var sightengine = require('sightengine')('596597753', 'Y6LDK9xy4TFsfbYsRJPQ');
var se = require('sightengine')('586807354', 'kezLz9UirxwoYa6jbbZw');

export default {
  name: 'analytics',
  extends: Line,
  components: {
    videoPlayer,
    Spinner,
    LineExample
  },
  data() {
    return {
      loading: false,
      links: [],
      color: '#21a8d8',
      base_url: 'http://127.0.0.1:8083/?imsi=',
      text: '',
      text_result: {},
      images: [
        'https://media.glamour.com/photos/59a706c7ce17d8468f996f70/master/w_2048,c_limit/aerie-nude-lookbook-2.jpg',
        'http://cdn2.tstatic.net/banjarmasin/foto/bank/images/a-tentara-nazi-jerman-pernah-menggunakan-sabu-sabu_20180219_192043.jpg',
        'https://drinks-dvq6ncf.netdna-ssl.com//wordpress/wp-content/uploads/2016/08/Beers-feature-350x350.jpg'
      ],
      selected_image: '',
      nudity_percent: '0',
      offensive_percent: '0',
      alchol_percent: '0',
      playerOptions: {
        height: '360',
        autoplay: false,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          // mp4
          src: 'https://d3m9459r9kwism.cloudfront.net/stream/examples/compilation.mp4',
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      },
      src: 'https://d3m9459r9kwism.cloudfront.net/stream/examples/compilation.mp4',      
      video_result: {},
    }
  },
  methods: {
    text_analysis() {
      axios.defaults.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Content-Type': 'application/json',
       };
      var self = this;
      axios.get(`${this.base_url}${this.text}`)
        .then(function (response) {
          self.text_result = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    select_image(image) {
      this.selected_image = image;
      this.loading = true;
      var self = this;      
      sightengine.check(['nudity','wad','offensive']).set_url(image).then(function(response) {
        // The result of the API
        self.loading = false;
        self.nudity_percent = response.nudity.raw * 100;
        self.offensive_percent = response.offensive.prob * 100;
        self.alchol_percent = response.alcohol * 100;
      }).catch(function(err) {
        // Error
        console.log(err);
      });
    },
    onPlayerPlay(player) {
      var self = this;
      se.check(['nudity','wad']).video_sync(this.src).then(function(response) {
      // The result of the API
      self.video_result = response;
      }).catch(function(err) {
        // Error
      });
    }
  },
  created() {
    var self = this;
    axios.get('http://localhost:3000/links')
        .then(function (response) {
          self.links = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  .bg-snapchat {
    background-color: #e6d435  !important;
  }
  .growth--down {
    color: #D32F2F;
  }
  .growth--up {
    color: #388E3C;
  }
  .image--padded {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .video-js .vjs-big-play-button{
    top: 5em;
    left: 9em;
  }
  
  .padded{
    padding: 20px;
  }
</style>
