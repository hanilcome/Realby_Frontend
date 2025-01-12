"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { red } from "@mui/material/colors";
import jwt from "jsonwebtoken";
import BlogSubs from "./BlogSubs";

/** 카테고리 리스트(삭제) */
export default function CategoryList({ blog_name: blog_name }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogUsedrId, setBlogUserId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchData(), fetchBlog();
  }, [blog_name]);

  const openModal = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Live방송을 시작하시겠습니까?");
    if (confirmation) {
      setIsModalOpen(true);
    }
  };

  const closeModal = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Live방송을 종료하시겠습니까?");
    if (confirmation) {
      setIsModalOpen(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/blogs/${blog_name}/category/`
      );

      const data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("access");
      const userId = jwt.decode(token).user_id;
      const response = await axios.get(
        `http://localhost:8000/blogs/${blog_name}`
      );
      const data = response.data.user;
      setBlogUserId(data);
      setUserId(userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="p-2.5">
      {blogUsedrId === userId ? (
        <Link href={`/${blog_name}/newpost`} className="hover:underline">
          ✏️글쓰기
        </Link>
      ) : (
        <BlogSubs blog_name={blog_name} />
      )}
      <form className="mb-10">
        {data &&
          data.map((e) => {
            const id = e.id;
            const category = e.category;
            return (
              <ul key={id} className="mb-2.5 mt-2.5">
                <li>
                  <Link
                    href={`/${blog_name}/${category}`}
                    className="no-underline text-inherit hover:underline text-base"
                  >
                    {category}
                  </Link>
                </li>
              </ul>
            );
          })}
        {/* {datablog.user !== payload_parse.user_id ? (
            null // 조건이 참일 경우 아무것도 렌더링하지 않음
          ) : (
            <div>
            실시간 채팅방
            <button onClick={isModalOpen ? closeModal : openModal} style={{marginLeft:"15px", color:"red"}}>
              {isModalOpen ? "비활성화" : "활성화"}
            </button>
          </div>
          )} */}
        {blogUsedrId === userId && (
          <div>
            실시간 채팅방
            <button
              onClick={isModalOpen ? closeModal : openModal}
              style={{ marginLeft: "15px", color: "red" }}
            >
              {isModalOpen ? "비활성화" : "활성화"}
            </button>
          </div>
        )}
      </form>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem label="Today">
            <DateCalendar defaultValue={dayjs()} readOnly />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </section>
  );
}
