import { useParams } from 'react-router-dom';
import { getAllLessons } from '../../Api/lessonsServices';
import { getAllChapters } from '../../Api/chaptersServices';
import { getAllCoursesApi } from '../../Api/coursesServices';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NavCustom from '../../Components/Nav/NavCustom';
import ReactPlayer from 'react-player';

import './Learn.css'

const allLessons = await getAllLessons()
const allChapters = await getAllChapters()
const allCourses = await getAllCoursesApi()
export const Learn = () => {
    const { courseId } = useParams();
    const [videoUrl, setVideoUrl] = React.useState()
    const [chapters, setChapters] = React.useState()
    const [lessons, setLessons] = React.useState()
    React.useEffect(() => {
        let chapters = allChapters.map((element) => element.idCourse == courseId && element)
        chapters = chapters.filter(item => item !== false);
        setChapters(chapters)
        if (chapters.length === 0) {
            setVideoUrl(false)
        } else {
            let chaptersId = chapters.map((element) => element.id)
            let lessons = allLessons.map((element) => {
                if (chaptersId.includes(element.idChapter)) {
                    return element
                }
                return false
            })
            lessons = lessons.filter(item => item !== false);
            setLessons(lessons)
            if (lessons.length === 0) {
                setVideoUrl(false)
            } else {
                setVideoUrl(lessons[0])
            }
        }

    }, [])
    const changeVideo = (video) => {
        setVideoUrl(video)
    }
    return (
        <>
            <NavCustom />
            <div className='learn'>
                {videoUrl ? <div className='video'>
                    <div className='player'>
                        <ReactPlayer
                            url={videoUrl.content}
                            width="640px"
                            height="360px"
                            playing={true}
                            controls={true}
                        />
                    </div>
                    <h1>{videoUrl.name}</h1>
                </div> : <div>Coming Soon</div>}
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >
                    {typeof (chapters) === 'object' ? chapters.map((element) => (
                        <li key={`chap-id-${element.id}`}>
                            <ul>
                                <ListSubheader>{element.name}</ListSubheader>
                                {typeof (lessons) === 'object' ? lessons.map((item) => {
                                    if (element.id === item.idChapter) {
                                        return <ListItem key={`item-${element.id}-${item.id}`}>
                                            <ListItemText className='item' primary={item.name} onClick={() => changeVideo(item)} />
                                        </ListItem>
                                    }
                                }) : null}
                            </ul>
                        </li>
                    )) : null}
                </List>
            </div>
        </>
    )
}
