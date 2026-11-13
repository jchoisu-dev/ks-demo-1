export default props => 
{
    const { 
        children,
        banner,
        bg,
        bgc,
        pos,
        ban
    } = props;
    // 
    return <div className="homemain" style={{background:`url(${bg}) ${bgc}`, backgroundPosition:pos, backgroundRepeat:"no-repeat", position:'relative'}}>
        <div className="tc banner">

        </div>
        <div className="homemainblock" style={{background:`url(${ban})repeat-x`}}>
            {children}
        </div>
    </div>
}