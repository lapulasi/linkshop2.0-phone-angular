import {Component, OnInit} from '@angular/core';
import {CustomerSuggestEcharts} from '../trends/customer-suggest-echarts';
import {HttpClient} from '@angular/common/http';
import {DateTimeFormatter, LocalDate} from 'js-joda';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
@Component({
  templateUrl: './customer-suggest.component.html'
})

export class CustomerSuggestComponent implements OnInit {

  orgCode ;

  peopleStructureType: number|string;
  peopleStructure: any;
  peopleStructureData: Array<any>;


  customMaxTimeType: number|string;
  customMaxTime: any;
  customMaxTimeData: Array<any>;


  customerShopTrend: any;
  customerShopTrendType: number|string;
  customerShopTrendData: Array<any>;

  customerStayTime: any;
  customerStayTimeType: number|string;
  customerStayTimeData: Array<any>;

  shopFlowRatioType: number|string;
  shopFlowRatio: any;
  shopFlowRatioData: Array<any>;
  org: any;
  constructor(private customerSuggest: CustomerSuggestEcharts, private http: HttpClient,
              private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    const element = document.getElementById('customer-suggest');
    element.scrollIntoView();
    this.route.paramMap.subscribe(paramMap => {

      this.orgCode = Number.parseInt(paramMap.get('orgCode'));

      this.peopleStructure = this.customerSuggest.getPeopleStructure();
      this.getPeopleStructure(7);

      this.customMaxTime = this.customerSuggest.getCustomMaxTime();
      this.getCustomMaxTime(7);
      this.customerShopTrend = this.customerSuggest.getCustomerShopTrend();
      this.getCustomerShopTrend(7);
      this.customerStayTime = this.customerSuggest.getCustomLongTime();
      this.getCustomerLongTime(7);
      this.shopFlowRatio = this.customerSuggest.getShopFlowRatio();
      this.getShopFlowRatio(7);
    });
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-客流参谋');

  }

  getPeopleStructure(n?: number) {
    this.peopleStructureType = (n != null ? n : 'all');
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(`/org/${this.orgCode}/accessLogs`, {params: {startDate, endDate}}).subscribe((result: Array<any>) => {
      const M_20_30 = {value: 0, name: '男 20-30岁'};
      const M_30_40 = {value: 0, name: '男 30-40岁'};
      const M_40_50 = {value: 0, name: '男 40-50岁'};
      const F_20_30 = {value: 0, name: '女 20-30岁'};
      const F_30_40 = {value: 0, name: '女 30-40岁'};
      const other = {value: 0, name: '其他'};
      for (const item of result) {
        if (item['gender'] === 'M' && item['age'] >= 20 && item['age'] <= 30) {
          M_20_30.value++;
        } else if (item['gender'] === 'M' && item['age'] >= 30 && item['age'] <= 40) {
          M_30_40.value++;
        } else if (item['gender'] === 'M' && item['age'] >= 40 && item['age'] <= 50) {
          M_40_50.value++;
        } else if (item['gender'] === 'F' && item['age'] >= 20 && item['age'] <= 30) {
          F_20_30.value ++;
        } else if (item['gender'] === 'F' && item['age'] >= 30 && item['age'] <= 40) {
          F_30_40.value++;
        } else {
          other.value++;
        }
      }
      this.peopleStructureData = [M_20_30, M_30_40, M_40_50, F_20_30, F_30_40, other].sort((a, b) => a.value >= b.value ? 1 : -1);
      this.peopleStructure = Object.assign({}, this.peopleStructure);
      this.peopleStructure['series']['data'] = this.peopleStructureData;
    });
  }

  getCustomMaxTime(n?: number) {
    this.customMaxTimeType = (n != null ? n : 'all');
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(`/org/${this.orgCode}/accessLogs/customerCountOfTimePeriod`, {params: {startDate, endDate}})
      .subscribe((result: Array<any>) => {
        this.customMaxTimeData = result.sort((a, b) => {
          if (a['count'] > b['count']) { return -1; } else if (b['count'] > a['count']) { return 1; } else { return 0; }
        }).filter(value => value['count'] > 0);
        const sumCount = this.customMaxTimeData.reduce((previousValue, currentValue) => previousValue + currentValue['count'], 0);
        this.customMaxTime = Object.assign({}, this.customMaxTime);
        this.customMaxTime['series']['data'] = this.customMaxTimeData.map(value => value['count'] / sumCount);
        this.customMaxTime['xAxis']['data'] = this.customMaxTimeData.map(value => value['hour'] + '点');
      });
  }

  getCustomerShopTrend(n?: number) {
    this.customerShopTrendType = (n != null ? n : 'all');
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(`/org/${this.orgCode}/accessLogs/customerCountOfTimePeriod`, {params: {startDate, endDate}})
      .subscribe((result: Array<any>) => {
        this.customerShopTrendData = result;
        this.customerShopTrend = Object.assign({}, this.customerShopTrend);
        this.customerShopTrend['series']['data'] = this.customerShopTrendData.map(value => value['count']);
        this.customerShopTrend['xAxis']['data'] = this.customerShopTrendData.map(value => value['hour'] + '点');
      });
  }

  getCustomerLongTime(n?: number) {
    this.customerStayTimeType = (n != null ? n : 'all');
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(`/org/${this.orgCode}/accessLogs/customerStayTime`, {params: {startDate, endDate}})
      .subscribe((result: Array<any>) => {
        this.customerStayTimeData = result.map(value => {
          const avgStayMin = value['stayMinSum'] / value['count'];
          value['avgStayMin'] = avgStayMin || 0;
          return value;
        })
        .sort((a, b) => a['avgStayMin'] >= b['avgStayMin'] ? -1 : 1)
        .filter(value => value['avgStayMin'] > 0);
        this.customerStayTime = Object.assign({}, this.customerStayTime);
        this.customerStayTime['series']['data'] = this.customerStayTimeData.map(value => value['avgStayMin'] );
        this.customerStayTime['xAxis']['data'] = this.customerStayTimeData.map(value => value['hour'] + '点');
      });
  }

  getShopFlowRatio(n?: number) {
    this.shopFlowRatioType = (n != null ? n : 'all');
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(`/org/${this.orgCode}/customerCount`, {params: {startDate, endDate}})
      .subscribe((result: Array<any>) => {
        result.sort((a, b) => {
          if (a['count'] > b['count']) { return 1; } else if (b['count'] > a['count']) { return -1; } else { return 0; }
        });
        if (result.length > 6) {
          const temp = result.slice(0, 6);
            temp.push(
            {'count': result.slice(6).reduce((accumulator, currentValue) => accumulator + currentValue['count'], 0),
              'shop_name': '其他'});
            result = temp;
        }
        const sum = result.reduce((previousValue, currentValue) => previousValue + currentValue['count'] , 0);
        this.shopFlowRatioData = result;
        this.shopFlowRatio = Object.assign({}, this.shopFlowRatio);
        this.shopFlowRatio['series']['data']  = result.map(value => ({value: value['count'], name: value['shop_name'] }));
        this.shopFlowRatio['legend']['data'] = result.map(value => ({name: value['shop_name']  , icon: 'rect'}));
        console.log(this.shopFlowRatio['legend']['data']);
      });

  }
}
