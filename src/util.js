

export function getRedirectPath({status, avatar}){
// return redirect path according to user information.
// user.status /hr /applicant /admin /company-manager /employee /customer-representative
// user.avatar /hr-info /applicant-info /company-manager-info /employee-info /customer-representative-info

    let url = '/' + status;
    if(!avatar){
        url += '-info'
    }
    return url;

}