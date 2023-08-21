import React from 'react'

const Newsitem = (props)=>  {
        let {title,description,imgurl,newsurl,author,date} = props;
    return (
        <div className="card mb-5" style={{width: "18rem"}}>
            <img src={imgurl?imgurl:"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title} ...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text">By "{!author?"Unknown":author}" at {new Date (date).toGMTString()}</p>
                <a href={newsurl} target='_blank' className="btn btn-sm btn-primary">View Detail</a>
            </div>
        </div>
    )
}


export default Newsitem;