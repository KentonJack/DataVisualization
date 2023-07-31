# Essay for CS416 Project 2

### Messaging

This visualization is aimed to show university rankings aggregated by country worldwide from 2012 to 2015, and users will be able to tell the evolving process for certain countries like Japan and China over these years, along with the dominance of US university rankings.

### Narrative Structure

The narrative structure of this project is generally following martini glass model, where users could observe 2012-2015 data first, gather some initial impression along with data source referenced to Kaggle link, then users could expand by comparing data from different years, highlighting circles in graph representing country details, and filter by top 10/50/etc. universities to further explore the difference.

### Visual Structure

Visual is primarily conducted via line charts. From initial thought, such data could have fit into a bar chart type. However, due to the data specialty that US high-rank universities are dominant over majority, using bar chart could make the visual effect much extreme imbalanced. Thus using a line chart better fits the visualization purpose. Users are granted small circles scattered around the line, so they can hover over and see exact data from each country. Also using a line better ensures that users can navigate thru different countries easily, instead of view mostly occupied by a tall bar representing US data. Transitioning between scenes is easy in this page, as the bottom x-axis coordinates keep the same across scenes, standing for a country. Thus, users can easily get a sense of country evolution in academics progress each year.

### Scenes

It has 4 scenes from year 2012 to 2015. These are ordered by year in ascendant and is a natural representation of ranking data changing over each year.

### Annotations

Annotations are shown in scene 2014 and 2015 following the same template (as they are conveying the same message), and hidden from other scenes. They are mainly set up to notify users that data size has been drastically increased for these 2 scenes.

### Parameters

The variables users can select are years and max_ranking. Years are coupled with scenes users can see, and the max_ranking is a user-provided value to filter out universities ranked below that. By using max_ranking, users could focus on only top universities and inspect the data subset further.

### Triggers

The trigger is provided via showing annotations on & off based on scene year, where annotations only pop up when year is at least 2014 to keep the data and info relevance: the data size increased a lot starting from 2014, thus only show the annotation after that.

