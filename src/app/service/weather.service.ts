import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class WeatherService {

  constructor(private http: WebHttpClient) {}

  getDistrictWeather(adcode: any, date: any) {
    return this.http.get('/org/weather/district/' + adcode, {date: date});
  }
  getWeatherDescribe(weather) {
    switch (weather) {
      case '晴': return {icon: 'sunny', name: '晴'};
      case '多云': return {icon: 'cloudy', name: '多云'};
      case '阵雨': return {icon: 'rain', name: '有雨'};
      case '小雨': return {icon: 'rain', name: '有雨'};
      case '雷阵雨': return {icon: 'rain', name: '有雨'};
      case '雷阵雨并伴有冰雹': return {icon: 'rain', name: '有雨'};
      case '雨夹雪': return {icon: 'rain', name: '有雨'};
      case '中雨': return {icon: 'rain', name: '有雨'};
      case '大雨': return {icon: 'rain', name: '有雨'};
      case '暴雨': return {icon: 'rain', name: '有雨'};
      case '大暴雨': return {icon: 'rain', name: '有雨'};
      case '特大暴雨': return {icon: 'rain', name: '有雨'};
      case '冻雨': return {icon: 'rain', name: '有雨'};
      case '小雨-中雨': return {icon: 'rain', name: '有雨'};
      case '中雨-大雨': return {icon: 'rain', name: '有雨'};
      case '大雨-暴雨': return {icon: 'rain', name: '有雨'};
      case '暴雨-大暴雨': return {icon: 'rain', name: '有雨'};
      case '大暴雨-特大暴雨': return {icon: 'rain', name: '有雨'};
      case '阵雪': return {icon: 'snow', name: '下雪'};
      case '小雪': return {icon: 'snow', name: '下雪'};
      case '中雪': return {icon: 'snow', name: '下雪'};
      case '大雪': return {icon: 'snow', name: '下雪'};
      case '暴雪': return {icon: 'snow', name: '下雪'};
      case '小雪-中雪': return {icon: 'snow', name: '下雪'};
      case '中雪-大雪': return {icon: 'snow', name: '下雪'};
      case '大雪-暴雪': return {icon: 'snow', name: '下雪'};
      case '沙尘暴': return {icon: 'bad_weather', name: '恶劣天气'};
      case '强沙尘暴': return {icon: 'bad_weather', name: '恶劣天气'};
      case '飑': return {icon: 'bad_weather', name: '恶劣天气'};
      case '龙卷风': return {icon: 'bad_weather', name: '恶劣天气'};
      case '霾': return {icon: 'overcast', name: '阴天'};
      case '阴': return {icon: 'overcast', name: '阴天'};
      case '雾': return {icon: 'overcast', name: '阴天'};
      case '浮尘': return {icon: 'overcast', name: '阴天'};
      case '扬沙': return {icon: 'overcast', name: '阴天'};
      case '轻雾': return {icon: 'overcast', name: '阴天'};
      default: return weather;
    }


  }


}
