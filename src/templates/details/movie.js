import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentHeaderComponent from "../../components/comment/header";
import CommentListComponent from "../../components/comment/list";
import CommentPostComponent from "../../components/comment/post";
import ContentListComponent from "../../components/content/list";
import ContentDetailsComponent from "../../components/content/details";
import URLComponent from "../../components/url";

const Content = () => {
  const params = useParams();
  return <MovieWrapper uuid={params.uuid} />;
};

class MovieWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      comments: [],
      recommendedContents: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/contents/${this.props.uuid}`)
      .then((res) => {
        this.setState({ movie: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });

    axios
      .get(`/api/contents/`)
      .then((res) => {
        this.setState({ recommendedContents: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });

    axios
      .get(`/api/comments/`)
      .then((res) => {
        this.setState({ comments: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movie && this.state.comments && this.state.movie !== prevState.movie) {
      const filteredComments = this.state.comments.filter(
        (comment) => comment.content_uuid === this.state.movie.uuid
      );

      if (filteredComments !== prevState.comments) {
        this.setState({ comments: filteredComments });
      }
    }
  }

  render() {
    const { movie, recommendedContents, comments, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <main className="wdth-cvr flx-drt-clmn">
        <URLComponent page={movie.title} />
        <div className="bd wdth-cvr flx-spc-btwn flx-tp wrp">
          <div className="lft-bg flx-cvr">
            <div className="lft wdth-cvr flx-drt-clmn">
              <div className="pstr-bg ptn-rltv wdth-cvr flx-cntr">
                <div className="pstr ptn-abslt tp-cvr lft-cvr cvr flx-cntr">
                  <span className="cvr flx-cntr">
                    <img src={movie.thumbnail_url} className="bdr-rds-1" loading="lazy" alt="thumbnail" />
                  </span>
                </div>
              </div>
              <ContentDetailsComponent content={movie} />
              <div className="cmnts-bg wdth-cvr flx-drt-clmn">
                <CommentHeaderComponent comments={comments} />
                <CommentPostComponent />
                <CommentListComponent comments={comments} />
              </div>
            </div>
          </div>
          <div className="rght-bg flx-cntr">
            <div className="rght wdth-cvr flx-drt-clmn">
              <ContentListComponent contents={recommendedContents} min={true} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Content;