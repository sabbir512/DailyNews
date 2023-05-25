
import React from 'react'

const NewsItem = (props)=>{
  

        let {title, description, imageUrl, newsUrl, date, author} = props
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl?"https://c.biztoc.com/p/13c207a5666a9eac/og.webp":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className='text-muted'>By {!author?"unkown": author} on {date}</small></p>
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }


export default NewsItem
