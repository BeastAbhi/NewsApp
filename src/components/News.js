import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  static defaultProps ={
      country: "in",
      pageSize: 8,
      category: "general"
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `News24/7 - ${this.props.category}`;
    }
    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData); 
      // this.setState({articles: parsedData.articles})
      this.props.setProgress(30);
      fetch(url).then((res) => res.json())
              .then((json) => {
                  this.setState({
                      articles: json.articles,
                      loading: false,
                      totalResults: json.totalResults
                  });
                  this.props.setProgress(80);
              })
              this.props.setProgress(100);
    }
    async componentDidMount(){
          this.updateNews();

              }

  //   handelPrevClick = async ()=>{
  //     this.setState({page: this.state.page - 1})
  //     this.updateNews();
  //   }
  //   handelNextClick = async ()=>{
  //     this.setState({page: this.state.page + 1})
  //     this.updateNews();
  //  }

          fetchMoreData = async () =>{
              
              const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&sortBy=publishedAt&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
              this.setState({page: this.state.page + 1})
              fetch(url).then((res) => res.json())
                      .then((json) => {
                          this.setState({
                              articles: this.state.articles.concat(json.articles),
                              totalResults: json.totalResults
                          });
        
                      })
          }

  render() {
    return (
      <div className='container my-3 bg-dark'>
        <h1 className="text-conter" style={{marginTop: "90px"}}>News24/7 - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
            <InfiniteScroll
      dataLength={this.state.articles.length}
      next={this.fetchMoreData}
      hasMore={this.state.articles.length !== this.state.totalResults}
      loader={<Spinner/>}
      >
        <div className="container">
        <div className="row">
        {/* {!this.state.loading && this.state.articles.map((element) =>{  */}

            {this.state.articles.map((element) =>{ 
                return <div className="col md-3" key={element.url}>
                    <NewsItem title = {element.title?element.title.slice(0, 45)+"...":""} description = {element.description?element.description.slice(0, 88)+"...":""} image={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}

        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
              <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handelPrevClick}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handelNextClick}>Next &rarr;</button>
              </div> */}
      </div>

    )
  }
}

export default News
