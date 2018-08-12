// if user hasn't setup his avatar, visit profile page after login. Otherwise, goto his status page.
export function getRedirectPath({status, avatar}){
// return redirect path according to user information.
// user.status /hr /applicant /admin /company-manager /employee /customer-representative
// user.avatar /hr-info /applicant-info /company-manager-info /employee-info /customer-representative-info

    let url = '/' + status;
    if(!avatar){
        url += '-profile'
    } else if (status === 'CompanyManager') {
        url += '-profile'
    }
    if(status === 'admin'){
        url = '/admin';
    }

    if(status === 'representative'){
        url = '/representative';
    } 
    
    // console.log(url);
    return url;

}