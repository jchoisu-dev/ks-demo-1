import { Pagination, Empty } from 'antd';

export default props =>
{
    const { 
        children,
        columns, 
        data,
        pageChange, 
        pageSize,
        tableClass
    } = props;
    // 
    const current = data&&data[0]&&data[0][0];
    const total = data&&data[0]&&data[0][1];
    const list = data&&data[1]||[];
    // 
    return(
        <div className="table">
            <table className={tableClass}>
                <thead>
                    <tr>
                        {columns&&columns.map((v,k)=>(
                            <th key={k}>{v[0]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list&&list.map((vv,kk)=>(
                        <tr key={kk}>
                            {columns&&columns.map((v,k)=>(
                                <td key={k}>{v[1]&&v[1](vv,kk)||vv[k]+''}</td>
                            ))}
                        </tr>
                    ))}
                    {/* {data.length==0?
                    <tr>
                        <td colSpan={columns.length}>
                            <Empty style={{margin:'100px 0'}} />
                        </td>
                    </tr>
                    :''} */}
                </tbody>
            </table>
            {pageChange&&list?
                <div className="pagination tc">
                    <Pagination 
                        current={current} 
                        total={total} 
                        pageSize={pageSize||20} 
                        onChange={pageChange}
                        showQuickJumper={true}
                        showSizeChanger={false}
                    />
                </div>
            :<></>}
            {children}
        </div>
    )
}