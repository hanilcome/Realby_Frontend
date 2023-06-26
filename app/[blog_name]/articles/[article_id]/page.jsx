import ArticleDetail from "@components/ArticleDetail";
import CommentView from "@components/CommentView";
import CommentWrite from "@components/CommentWrite";
import ArticleDelete from "@components/ArticleDelete";
import Link from "next/link";
import ArticleLike from "@components/ArticleLike";

/**
 * 상세 게시글 페이지
 * @params {blog_name} 블로그 이름
 * @params {article_id} 게시글 아이디
 */
export default function articleDetail({ params }) {
  return (
    <>
      <ArticleDetail
        blog_name={params.blog_name}
        article_id={params.article_id}
      />
      <div>======================</div>
      <Link href={`/${params.blog_name}/articles/${params.article_id}/edit`}>
        수정
      </Link>
      <div>======================</div>
      <ArticleDelete
        blog_name={params.blog_name}
        article_id={params.article_id}
      />
      <ArticleLike
        blog_name={params.blog_name}
        article_id={params.article_id}
      />
      <div>======================</div>
      <CommentView
        article_id={params.article_id}
        blog_name={params.blog_name}
      />
      <div>======================</div>
      <CommentWrite article_id={params.article_id} />
      <div>======================</div>
      <Link href={`/${params.blog_name}`}>게시글 목록으로 돌아가자</Link>
      <div>======================</div>
    </>
  );
}