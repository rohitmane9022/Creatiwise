import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaWordpress } from "react-icons/fa";
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const articlesData = [
  { title: 'How to Improve Your Skills in League of Legends', keyword: 'league of legends [2240000]', words: 4575, createdOn: '20 hours ago' },
  { title: 'How to Master Last Hitting in League of Legends', keyword: 'league of legends [2240000]', words: 3480, createdOn: '21 hours ago' },
  { title: '7 Tips for Better Teamplay in League of Legends', keyword: 'league of legends [2240000]', words: 2676, createdOn: 'a day ago' },
  { title: 'Top Virtual Executive Assistant Services (2024)', keyword: 'virtual executive assistant [2900]', words: 2408, createdOn: '1 Oct, 24' },
  { title: 'Unlimited Graphics Design Solutions', keyword: 'unlimited graphic design services [390]', words: 1793, createdOn: '---' },
  { title: 'Top Amazon Payment Methods for Quick Access to Funds', keyword: 'amazon payment methods [3600]', words: 2647, createdOn: '---' },
  { title: "Backlinks 101: What are backlinks and why they're important [Free template]", keyword: 'backlinks [8100]', words: 2261, createdOn: '---' },
  { title: '7 Leading AI SEO Tools in 2024 (Ranked & Compared)', keyword: 'ai seo software [880]', words: 1543, createdOn: '---' },
  { title: 'Unlimited Graphic Design Services You Can Rely On', keyword: 'unlimited graphic design services [390]', words: 1974, createdOn: '---' },
];

const getArticlesPromise = new Promise((resolve) => {
  setTimeout(() => resolve(articlesData), 1000);
});

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeButton, setActiveButton] = useState('Generated Articles');
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getArticlesPromise
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  
  const filteredArticles = articles
    .filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.words - b.words : b.words - a.words
    );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isAllSelected = filteredArticles.length > 0 && selectedRows.length === filteredArticles.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredArticles.map((_, index) => index));
    }
  };

  const toggleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  if (loading) {
    return (
      <Box
        className="fixed inset-0 flex items-center justify-center bg-background/80 z-50"
        aria-label="Loading"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 sm:w-[1260px]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{activeButton}</h1>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {['Generated Articles', 'Published Articles', 'Scheduled Articles', 'Archived Articles'].map((btn) => (
          <Button
            key={btn}
            variant={activeButton === btn ? 'default' : 'outline'}
            className={activeButton === btn ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
            onClick={() => setActiveButton(btn)}
          >
            {btn}
          </Button>
        ))}
      </div>

      <div className="mb-4 max-w-xs mx-auto w-full">
        <Input
          placeholder="Search Title or Keyword..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="border-b-2 rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="border-b-2">
            <TableRow>
              <TableHead>
                <Checkbox checked={isAllSelected} onCheckedChange={toggleSelectAll} />
              </TableHead>
              <TableHead>Articles Title</TableHead>
              <TableHead>Keyword [Traffic]</TableHead>
              <TableHead
                className="cursor-pointer flex items-center gap-1"
                onClick={toggleSortOrder}
              >
                Words {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Publish</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredArticles.map((article, index) => (
              <TableRow key={index} className="border-b-2">
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(index)}
                    onCheckedChange={() => toggleRowSelect(index)}
                  />
                </TableCell>
                <TableCell className="text-left truncate max-w-[200px] sm:max-w-xs text-sm">{article.title}</TableCell>
                <TableCell className="text-left text-sm">{article.keyword}</TableCell>
                <TableCell className="text-sm">{article.words}</TableCell>
                <TableCell className="text-sm">{article.createdOn}</TableCell>
                <TableCell><Button variant="outline" size="sm">View</Button></TableCell>
                <TableCell className="flex items-center gap-2">
                  <FaWordpress className="text-xl text-blue-600" />
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
        <span>Total {filteredArticles.length} Article Titles</span>
        <div className="flex items-center gap-2">
          <label htmlFor="entries">Show</label>
          <select
            id="entries"
            className="border rounded px-2 py-1 text-sm bg-transparent"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries per page</span>
        </div>
      </div>
    </div>
  );
}