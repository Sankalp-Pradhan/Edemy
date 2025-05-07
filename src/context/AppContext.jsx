import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [allCourses, setAllCourses] = useState([]);
    const [isEduactor, setIsEduactor] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // ✅ Correct useEffect and function definition placement
    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses(); // ✅ CALL the function (you missed the `()`)
    }, []);

    // ✅ Fetch all Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    // ✅ Fetch user enrolled courses
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    };

    // ✅ Calculate average rating
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
    };

    // ✅ Calculate chapter time
    const CalculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.forEach((lecture) => {
            time += lecture.lectureDuration;
        });
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // ✅ Calculate total course duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.forEach((chapter) => {
            chapter.chapterContent.forEach((lecture) => {
                time += lecture.lectureDuration;
            });
        });
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
    };

    // ✅ Calculate number of lectures
    const CalculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach((chapter) => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    };

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEduactor,
        setIsEduactor,
        CalculateChapterTime,
        calculateCourseDuration,
        CalculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
