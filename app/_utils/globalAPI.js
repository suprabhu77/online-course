import request, { gql } from "graphql-request";
const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_HYGRAPH_KEY +
  "/master";

const getCourseList = async () => {
  const query = gql`
    query Courses {
      courseLists(first: 10, orderBy: createdAt_DESC) {
        name
        banner {
          url
        }
        tags
        description
        id
        free
        totalChapters
        author
        demoUrl
        chapter {
          ... on Chapter {
            id
            name
            shortDescription
            totalChapters
            video {
              url
            }
          }
        }
        youtubeUrl
        sourceCode
        slug
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getUserEnrolledCoursesbyEmail = async (emailId) => {
  const query =
    gql`
    query MyQuery {
      userEnrolCourses(where: { userEmail: "` +
    emailId +
    `" }) {
        courseList {
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
              shortDescription
            }
          }
          name
          sourceCode
          slug
          tags
          totalChapters
        }
        completedChapter {
          ... on CompletedChapter {
            id
            chapterid
          }
        }
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getSideBarNav = async () => {
  const query = gql`
    query SideBanner {
      sideBanners {
        id
        name
        banner {
          url
        }
        url
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getCourseListbyID = async (params) => {
  const query =
    gql`
    query GetCourseListByID {
      courseList(where: { slug: "` +
    params +
    `" }) {
        name
        banner {
          url
        }
        tags
        description
        id
        free
        totalChapters
        author
        demoUrl
        chapter {
          ... on Chapter {
            id
            name
            shortDescription
            totalChapters
            video {
              url
            }
          }
        }
        youtubeUrl
        sourceCode
        slug
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const enrollCourse = async (courseId, emailId) => {
  console.log(courseId, emailId);
  const query =
    gql`
    mutation MyMutation {
      createUserEnrolCourse(
        data: {
          courseId: "` +
    courseId +
    `"
          userEmail: "` +
    emailId +
    `"
          courseList: { connect: { slug: "` +
    courseId +
    `" } }
        }
      ) {
        id
      }
      publishManyUserEnrolCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getEnrolledCourse = async (courseId, emailId) => {
  const query =
    gql`
    query getEnrolledCourse {
      userEnrolCourses(
        where: {
          courseId: "` +
    courseId +
    `"
          userEmail: "` +
    emailId +
    `"
        }
      ) {
        id
      }
    }
  `;
  const result = request(MASTER_URL, query);
  return result;
};

const getUserEnrolledCourses = async (emailId, id) => {
  const query =
    gql`
    query userEnrolCourses {
      userEnrolCourses(
        where: { userEmail: "` +
    emailId +
    `", id: "` +
    id +
    `" }
      ) {
        id
        courseId
        userEmail
        completedChapter {
          ... on CompletedChapter {
            id
            chapterid
          }
        }
        courseList {
          name
          description
          banner {
            url
          }
          totalChapters
          author
          chapter {
            ... on Chapter {
              id
              name
              totalChapters
              shortDescription
              video {
                url
              }
            }
          }
          slug
          sourceCode
          demoUrl
        }
      }
    }
  `;
  const result = request(MASTER_URL, query);
  return result;
};

const CompletedChapter = async (enrollId, chapterID) => {
  const query =
    gql`
    mutation MyMutation {
      updateUserEnrolCourse(
        data: {
          completedChapter: {
            create: {
              CompletedChapter: {
                data: { chapterid: "` +
    chapterID +
    `" }
              }
            }
          }
        }
        where: { id: "` +
    enrollId +
    `" }
      ) {
        id
      }
      publishUserEnrolCourse(where: { id: "` +
    enrollId +
    `" }) {
        id
      }
    }
  `;
  const result = request(MASTER_URL, query);
  return result;
};
export default {
  getCourseList,
  getSideBarNav,
  getCourseListbyID,
  enrollCourse,
  getEnrolledCourse,
  getUserEnrolledCourses,
  CompletedChapter,
  getUserEnrolledCoursesbyEmail,
};
