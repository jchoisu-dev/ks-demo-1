import { useModel, Redirect } from 'umi';
//
export default (props) => 
{
    const { initialState } = useModel('@@initialState');
    const Auth = initialState&&initialState.Auth||'';
    //
    if (Auth&&Auth.__tk) 
    {
        return <div>{ props.children }</div>;
    }
    return <Redirect to="/" />;
}