import {
  BASE_URL,
} from './apiAddress'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//#region exportExcel

function exportExcel(url,data)
{
    console.log(1111)
    var form = $("<form>");   //定义一个form表单  
    form.attr('style','display:none');   //在form表单中添加查询参数  
    form.attr('target','_blank');  
    form.attr('method','post');  
    form.attr('action',url);  
                        
    var input1 = $('<input>');   
    input1.attr('type','hidden');   
    input1.attr('name','bodys');   
    input1.attr('value',JSON.stringify(data));    
    
    $('body').append(form);  //将表单放置在web中  
    form.append(input1);   //将查询参数控件提交到表单上  
    form.submit();   //表单提交  
}

export default exportExcel;
//#endregion
