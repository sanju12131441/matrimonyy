import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
firstPage(data) {
  return this.http.post('http://partner.hansmatrimony.com/api/' + 'createFirstPageProfile', data);
}
secondPage(data) {
  return this.http.post('http://partner.hansmatrimony.com/api/' + 'createSecondPageProfile', data);
}
thirdPage(data) {
  return this.http.post('http://partner.hansmatrimony.com/api/' + 'createThirdPageProfile', data);
}
FourthPage(data) {
  return this.http.post('http://partner.hansmatrimony.com/api/' + 'createFourthPageProfile', data);
}
getcastes(){
  return this.http.get('http://partner.hansmatrimony.com/api/getAllCaste');
}
getAlldegree(){
  return this.http.get('http://partner.hansmatrimony.com/api/getAllDegree');
}
getOccupation(){
  return this.http.get('http://partner.hansmatrimony.com/api/getAllOccupation');
}
getState(){
  return this.http.get('http://partner.hansmatrimony.com/api/getAllState');
}
getcity(){
  return this.http.get('http://partner.hansmatrimony.com/api/getAllCity');
}
}
