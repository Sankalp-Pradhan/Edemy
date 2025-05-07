import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [allCourses, setAllCourses] = useState([])
    const [isEduactor, setIsEduactor] = useState(true)
    // Fetch all Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    //function to calculate average ratiing of a course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0
        }
        let TotalRating = 0
        course.courseRatings.forEach(rating => {
            TotalRating += rating.rating
        });
        return TotalRating / course.courseRatings.length
    }

    //Functioon to calculate course chapter time
    const CalculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] })
    }

    //Function to Calculate Course Duraton
    const calculateCourseDuration = (course) => {
        let time = 0

        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] })
    }

    //function to calculate to no   of lectures in the course
    const CalculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        })
        return totalLectures;
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])

    const value = {
        currency, allCourses, navigate, calculateRating, isEduactor, setIsEduactor ,CalculateChapterTime , calculateCourseDuration , CalculateNoOfLectures
        }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
